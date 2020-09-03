import { HttpParams } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { concat, interval, Observable } from 'rxjs';
import { distinctUntilKeyChanged, first, retry, switchMap, tap, distinctUntilChanged, pairwise, skip } from 'rxjs/operators';
import { User } from '../../models/user.interface';
import { BaseModelStore } from '../../state/abstractions/base-model.store';
import { ModelStateConfig } from '../../state/model-state.config';
import { ApiService } from '../api.service';
import { AuthStoreActions } from '../auth/auth-store-actions.enum';
import { AuthStore } from '../auth/auth.store';
import { DeviceInfoService } from '../device-info.service';
import { PersistanceStore } from '../persistance/persistance.store';
import { ArrayHelperService } from '../utility/array-helper.service';
import { StoreState } from './interfaces/store-state';
import { EntitySyncResponse, SyncResponse } from './interfaces/sync-response.interface';
import { SyncStoreConfig } from './interfaces/sync-store-config.interface';
import { SyncStoreTimestamps } from './interfaces/sync-store-timestamps.interface';
import { SyncPropertySettings } from './sync-property.settings';
import { SyncStoreActions } from './sync-store-actions.enum';

@Injectable({
  providedIn: 'root'
})
export class SyncStore extends BaseModelStore<StoreState>{

  syncConfig$: Observable<SyncStoreConfig> = this.property$("syncConfig");

  get syncConfig(): SyncStoreConfig { return this.getProperty("syncConfig"); }

  get syncTimestamps(): SyncStoreTimestamps { return this.getProperty("syncTimestamps"); } 

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private appRef: ApplicationRef,
    private deviceInfoService: DeviceInfoService,
    private persistanceStore: PersistanceStore,
    private authStore: AuthStore,
  ){
    super(arrayHelperService, apiService, { trackStateHistory: true,logStateChanges: true });

    this.initConfigObserver();

    this.persistanceStore.stateInitalized$
      .subscribe(x => this.authStore.hasTokens ? this.syncAll() : null)

    this.continousSync$.subscribe();

    this.property$<AuthStoreActions>("lastAction").subscribe(action => this.handleAuthActions(action))
  }

  syncAll() : void{
    if(!this.deviceInfoService.isOnline) return;
    let params = new HttpParams();

    this.persistanceStore.stateInitalized$.pipe(switchMap(x => {
      params = params.set("initialNumberOfMonths", this.syncConfig?.initialNumberOfMonths)

      Object.keys(SyncPropertySettings).forEach(prop => {
        let timestamp = this.syncTimestamps ? this.syncTimestamps[prop] : null;
        params = params.set(SyncPropertySettings[prop]?.requestKey, timestamp ? timestamp.toString() : null);
      })

      return this.apiService
        .get('/SyncAll', params)
        .pipe(
          tap(data => this.setSyncResponseState(data)),
      );
    })).subscribe();
  }

  purgeAll = () => {
    this.persistanceStore.stateInitalized$.subscribe(x => {
      let state = {syncTimestamps: {}};
      Object.keys(SyncPropertySettings).forEach(prop => state[prop] = null);
      this._setStateVoid(state, SyncStoreActions.StorePurge)
    })
  };

  updateSyncConfig = (syncConfig: SyncStoreConfig): void =>
    this._setStateVoid({syncConfig}, SyncStoreActions.UpdateSyncConfig);

  private syncIfTimePassed = (): void => {
    const timestamp = this.getEarliestTimestamp();
    const timeSinceLastSync = (new Date().getTime() / 1000) - timestamp;
    if(timeSinceLastSync > this.syncConfig?.refreshTime) this.syncAll();             
  }

  private setSyncResponseState(response: SyncResponse){
    let state = {syncTimestamps: {}};

    this.syncCurrentUser(response[SyncPropertySettings.currentUser.responseKey], state);

    Object.keys(SyncPropertySettings).filter(x => x !== "currentUser").forEach(prop => 
      this.syncLocalEntityResponse(prop, response[SyncPropertySettings[prop]?.responseKey], state));
      
    this._setStateVoid(state, SyncStoreActions.StoreSync)
  }

  private syncLocalEntityResponse(prop: string, response: EntitySyncResponse, state: Partial<StoreState>): void{
    if(!response || !prop) return;
    
    state.syncTimestamps[prop] = response.timestamp; //Update given timestamp
    const modelSettings = ModelStateConfig[prop];
    if(!modelSettings) throw `No model state config for property ${prop}`;
    state[prop] = 
        this.arrayHelperService.addOrUpdateRange(this.getStateProperty(prop), response.entities, modelSettings.identifier); 
    state[prop] = 
        this.arrayHelperService.removeRangeByIdentifier(state[prop], response.deletedEntities, modelSettings.identifier);
  } 

  private syncCurrentUser(response: EntitySyncResponse, state: Partial<StoreState>): void{
    state.syncTimestamps.currentUser = response.timestamp; //Update given timestamp
    if(response?.entities?.length > 0) state.currentUser = response.entities[0] as User;
  }

  private handleAuthActions(action: AuthStoreActions){console.log(action);
    switch(action){
      case AuthStoreActions.Login: this.syncAll();
      case AuthStoreActions.Logout: this.purgeAll();
    }
  }

  private getEarliestTimestamp = (): number =>
    this.syncTimestamps ? Object.values(this.syncTimestamps).sort(function(a,b) {return a - b})[0] : 0; 

  private initConfigObserver() {
    const syncIfConfigChanges$ = this.property$<SyncStoreConfig>("syncConfig").pipe(
      distinctUntilKeyChanged("initialNumberOfMonths"),skip(1),
      tap(x => {
        this.purgeAll();
        this.syncAll();    
      })
    );

    concat(
      this.persistanceStore.stateInitalized$.pipe(tap(x => this.initConfigIfNull())), 
      syncIfConfigChanges$
    ).subscribe();
  }

  private initConfigIfNull(): void {
    if(this.getProperty("syncConfig")) return;
    this._setStateVoid({syncConfig: {
      refreshTime: 60*30, 
      initialNumberOfMonths: '48',
    }}, SyncStoreActions.InitSyncConfig);
  }

  private get continousSync$(){
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const continousSync$ = interval(1000*60*3).pipe(tap(x => this.authStore.hasTokens ? this.syncIfTimePassed() : null));  
    return concat(appIsStable$, continousSync$);
  }
}
