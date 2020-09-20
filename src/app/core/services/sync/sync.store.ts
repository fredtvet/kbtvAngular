import { HttpParams } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject, concat, EMPTY, interval, Observable, zip } from 'rxjs';
import { distinctUntilKeyChanged, first, skip, switchMap, tap } from 'rxjs/operators';
import { User } from '../../models/user.interface';
import { BaseStore } from '../../state/abstracts/base.store';
import { ApiService } from '../api.service';
import { AuthStore } from '../auth/auth.store';
import { DeviceInfoService } from '../device-info.service';
import { PersistanceStore } from '../persistance/persistance.store';
import { ArrayHelperService } from '../utility/array-helper.service';
import { StoreState } from './interfaces/store-state';
import { EntitySyncResponse, SyncResponse } from './interfaces/sync-response.interface';
import { SyncStoreConfig } from './interfaces/sync-store-config.interface';
import { SyncStoreTimestamps } from './interfaces/sync-store-timestamps.interface';
import { SyncStateConfig } from './sync-state.config';
import { ModelStateConfig } from '../../model/model-state.config';
import { AuthStoreActions } from '../auth/auth-store-actions.enum';

@Injectable({
  providedIn: 'root'
})
export class SyncStore extends BaseStore<StoreState>{
  
  private hasInitialSyncedSubject = new BehaviorSubject<boolean>(false);
  hasInitialSynced$: Observable<boolean> = this.hasInitialSyncedSubject.asObservable().pipe(first(x => x === true));

  syncConfig$: Observable<SyncStoreConfig> = this.property$("syncConfig");

  get syncConfig(): SyncStoreConfig { return this.getStateProperty("syncConfig"); }

  get syncTimestamps(): SyncStoreTimestamps { return this.getStateProperty("syncTimestamps"); } 

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private appRef: ApplicationRef,
    private deviceInfoService: DeviceInfoService,
    private persistanceStore: PersistanceStore,
    private authStore: AuthStore,
  ){
    super(arrayHelperService, apiService);
  }

  init(){
    this.initConfigObserver();

    this.syncAll()

    this.continousSync$.subscribe();

    this.property$<AuthStoreActions>("lastAction")
      .subscribe(action => this.handleAuthActions(action))
  }

  syncAll() : void{
    if(!this.deviceInfoService.isOnline) return;
    let params = new HttpParams();

    if(!this.authStore.hasTokens) return;

    params = params.set("initialNumberOfMonths", this.syncConfig?.initialNumberOfMonths)

    Object.keys(SyncStateConfig).forEach(prop => {
      let timestamp = this.syncTimestamps ? this.syncTimestamps[prop] : null;
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
      this._setStateVoid(state)
    })
  };

  purgeSyncAndLocal = () => {
    this.persistanceStore.stateInitalized$.subscribe(x => {
      let state = this.getState(false);
      let ignoredProps = {refreshToken: true, accessToken: true, currentUser: true};

      for(const key in state)
        if(!ignoredProps[key]) state[key] = null;
      
      this._setStateVoid(state)
    })
  };

  updateSyncConfig = (syncConfig: SyncStoreConfig): void =>
    this._setStateVoid({syncConfig});

  private syncIfTimePassed = (): void => {
    const timestamp = this.getEarliestTimestamp();
    const timeSinceLastSync = (new Date().getTime() / 1000) - timestamp;
    if(timeSinceLastSync > this.syncConfig?.refreshTime) this.syncAll();             
  }

  private setSyncResponseState(response: SyncResponse){
    let state = {syncTimestamps: {}};

    this.syncCurrentUser(response[SyncStateConfig.currentUser.responseKey], state);

    Object.keys(SyncStateConfig).filter(x => x !== "currentUser").forEach(prop => 
      this.syncLocalEntityResponse(prop, response[SyncStateConfig[prop]?.responseKey], state));
        
    this._setStateVoid(state);

    this.hasInitialSyncedSubject.value ? null : this.hasInitialSyncedSubject.next(true);
  }

  private syncLocalEntityResponse(prop: string, response: EntitySyncResponse, state: Partial<StoreState>): void{
    if(!response || !prop) return;
    
    state.syncTimestamps[prop] = response.timestamp; //Update given timestamp
    const id = ModelStateConfig.get(prop)?.identifier;

    if(response.entities?.length > 0)
      state[prop] = 
          this.arrayHelperService.addOrUpdateRange(this.getStateProperty(prop), response.entities, id); 
    if(response.deletedEntities?.length > 0)
      state[prop] = 
          this.arrayHelperService.removeRangeByIdentifier(state[prop], response.deletedEntities, id);
  } 

  private syncCurrentUser(response: EntitySyncResponse, state: Partial<StoreState>): void{
    state.syncTimestamps.currentUser = response.timestamp; //Update given timestamp
    if(response?.entities?.length > 0) state.currentUser = response.entities[0] as User;
  }

  private handleAuthActions(action: AuthStoreActions){
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

  private getEarliestTimestamp = (): number =>
    this.syncTimestamps ? Object.values(this.syncTimestamps).sort(function(a,b) {return a - b})[0] : 0; 

  private initConfigObserver() {
    const syncIfConfigChanges$ = this.property$<SyncStoreConfig>("syncConfig").pipe(
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
    this._setStateVoid({syncConfig: {
      refreshTime: 60*30, 
      initialNumberOfMonths: '48',
    }});
  }

  private get continousSync$(){
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const continousSync$ = interval(1000*60*3).pipe(tap(x => this.authStore.hasTokens ? this.syncIfTimePassed() : null));  
    return concat(appIsStable$, continousSync$);
  }
}
