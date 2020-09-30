import { HttpParams } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject, concat, interval, Observable, zip } from 'rxjs';
import { distinctUntilKeyChanged, filter, first, skip, tap } from 'rxjs/operators';
import { _addOrUpdateRange } from 'src/app/shared-app/helpers/array/add-or-update-range.helper';
import { _removeRangeByIdentifier } from 'src/app/shared-app/helpers/array/remove-range-by-identifier.helper';
import { _getUnixTimeSeconds } from 'src/app/shared-app/helpers/datetime/get-unix-time-seconds.helper';
import { ModelStateConfig } from '../../model/model-state.config';
import { ModelState } from '../../model/model.state';
import { Prop } from '../../model/state.types';
import { Mission } from '../../models';
import { User } from '../../models/user.interface';
import { ObservableStore } from '../../observable-store/observable-store';
import { ObservableStoreBase } from '../../observable-store/observable-store-base';
import { ApiService } from '../api.service';
import { AuthStoreActions } from '../auth/auth-store-actions.enum';
import { AuthStore } from '../auth/auth.store';
import { DeviceInfoService } from '../device-info.service';
import { PersistanceStore } from '../persistance/persistance.store';
import { StoreState } from './interfaces/store-state';
import { EntitySyncResponse, SyncResponse } from './interfaces/sync-response.interface';
import { SyncStoreConfig } from './interfaces/sync-store-config.interface';
import { SyncStoreTimestamps } from './interfaces/sync-store-timestamps.interface';
import { SyncStateConfig } from './sync-state.config';

@Injectable({
  providedIn: 'root'
})
export class SyncStore extends ObservableStore<StoreState>{
  
  private hasInitialSyncedSubject = new BehaviorSubject<boolean>(false);
  hasInitialSynced$: Observable<boolean> = this.hasInitialSyncedSubject.asObservable().pipe(first(x => x === true));

  syncConfig$: Observable<SyncStoreConfig> = this.stateProperty$("syncConfig");

  missions$: Observable<Mission[]> = this.stateProperty$("missions");

  get syncConfig(): SyncStoreConfig { return this.getStateProperty("syncConfig"); }

  get syncTimestamps(): SyncStoreTimestamps { return this.getStateProperty("syncTimestamps"); } 

  constructor(
    base: ObservableStoreBase,
    private apiService: ApiService,
    private appRef: ApplicationRef,
    private deviceInfoService: DeviceInfoService,
    private persistanceStore: PersistanceStore,
    private authStore: AuthStore,) { 
    super(base);
  }

  init(){
    this.initConfigObserver();

    this.syncAll()

    this.continousSync$.subscribe();

    this.globalStateChanges$.subscribe(x => this.handleAuthActions(x?.action))
  }

  syncAll() : void{
    if(!this.deviceInfoService.isOnline) return;
    let params = new HttpParams();

    if(!this.authStore.hasTokens) return;

    params = params.set("initialNumberOfMonths", this.syncConfig?.initialNumberOfMonths)
    const timestamps = this.syncTimestamps || [];
    Object.keys(SyncStateConfig).forEach(prop => {
      let timestamp = timestamps[prop];
      params = params.set(SyncStateConfig[prop]?.requestKey, timestamp ? timestamp.toString() : null);
    });

    zip(
      this.apiService.get('/SyncAll', params),
      this.persistanceStore.stateInitalized$
    ).subscribe(x => this.setSyncResponseState(x[0]))
  }

  purgeSyncState = () => {
    this.persistanceStore.stateInitalized$.subscribe(x => {
      let state = {syncTimestamps: {}};
      Object.keys(SyncStateConfig).forEach(prop => state[prop] = null);
      this.setState(state)
    })
  };

  purgeSyncAndLocal = () => {
    this.persistanceStore.stateInitalized$.subscribe(x => {
      let state = {...this.getStateProperties(null, false)}; //Shallow copy sufficient
      let ignoredProps = {refreshToken: true, accessToken: true, currentUser: true};

      for(const key in state){
        if(!ignoredProps[key]) state[key] = null;
        else delete state[key];
      }
      
      this.setState(state)
    })
  };

  updateSyncConfig = (syncConfig: SyncStoreConfig): void =>
    this.setState({syncConfig});

  private syncIfTimePassed = (): void => {
    const timestamp = this.getEarliestTimestamp();
    const timeSinceLastSync = _getUnixTimeSeconds() - timestamp;
    if(timeSinceLastSync > this.syncConfig?.refreshTime) this.syncAll();             
  }

  private setSyncResponseState(response: SyncResponse){
    const syncProps = Object.keys(SyncStateConfig) as Prop<StoreState>[];

    let state = {syncTimestamps: {}};

    this.syncCurrentUser(response[SyncStateConfig.currentUser.responseKey], state);

    syncProps.filter(x => x !== "currentUser").forEach(prop => 
      this.syncLocalEntityResponse(prop as Prop<ModelState>, response[SyncStateConfig[prop]?.responseKey], state));

    this.setState(state);

    this.hasInitialSyncedSubject.value ? null : this.hasInitialSyncedSubject.next(true);
  }

  private syncLocalEntityResponse(prop: Prop<ModelState>, response: EntitySyncResponse, state: Partial<StoreState>): void{
    if(!response || !prop) return;
    
    state.syncTimestamps[prop] = response.timestamp; //Update given timestamp
    const id = ModelStateConfig.get(prop)?.identifier;

    if(response.deletedEntities?.length > 0)
      state[prop] = 
          _removeRangeByIdentifier<any>(this.getStateProperty(prop), response.deletedEntities, id);

    if(response.entities?.length > 0)//If no delete operation, get state again
      state[prop] = 
          _addOrUpdateRange<any>(state[prop] || this.getStateProperty(prop), response.entities, id); 
    
  } 

  private syncCurrentUser(response: EntitySyncResponse, state: Partial<StoreState>): void{
    state.syncTimestamps.currentUser = response.timestamp; //Update given timestamp
    if(response?.entities?.length > 0) state.currentUser = response.entities[0] as User;
  }

  private handleAuthActions(action: string){
    switch(action){
      case AuthStoreActions.Login: this.syncAll(); break;
      case AuthStoreActions.NewLogin: {
        this.purgeSyncAndLocal(); 
        this.initConfigIfNull();
        this.syncAll();
        break;
      }
      default: break;
    }
  }

  private getEarliestTimestamp = (): number =>{
    const timestamps = this.syncTimestamps;
    return timestamps ? Object.values(timestamps).sort(function(a,b) {return a - b})[0] : 0; 
  }

  private initConfigObserver() {
    const syncIfConfigChanges$ = this.stateProperty$<SyncStoreConfig>("syncConfig").pipe(
      filter(x => x != null),
      distinctUntilKeyChanged("initialNumberOfMonths"),skip(1),
      tap(x => {
        this.purgeSyncState();
        this.syncAll();    
      })
    );

    concat(
      this.persistanceStore.stateInitalized$.pipe(tap(x => this.initConfigIfNull())), 
      syncIfConfigChanges$
    ).subscribe();
  }

  private initConfigIfNull(): void {
    if(this.getStateProperty("syncConfig", false)) return;
    this.setState({syncConfig: {
      refreshTime: 60*30, 
      initialNumberOfMonths: '48',
    }}, null, false);
  }

  private get continousSync$(){
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const continousSync$ = interval(1000*60*3).pipe(tap(x => this.authStore.hasTokens ? this.syncIfTimePassed() : null));  
    return concat(appIsStable$, continousSync$);
  }
}
