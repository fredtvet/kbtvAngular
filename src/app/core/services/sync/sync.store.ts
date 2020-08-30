import { HttpParams } from '@angular/common/http';
import { Injectable, ApplicationRef } from '@angular/core';
import { Observable, interval, concat, Subscription } from 'rxjs';
import { distinctUntilKeyChanged, retry, skip, tap, first, switchMap, pluck } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { DeviceInfoService } from '../device-info.service';
import { ArrayHelperService } from '../utility/array-helper.service';
import { StoreState } from './interfaces/store-state';
import { EntitySyncResponse, SyncResponse } from './interfaces/sync-response.interface';
import { SyncStoreConfig } from './interfaces/sync-store-config.interface';
import { SyncStoreTimestamps } from './interfaces/sync-store-timestamps.interface';
import { SyncStoreActions } from './sync-store-actions.enum';
import { SyncPropertySettings } from './sync-property.settings';
import { ModelStateSettings } from '../../state/model-state.settings';
import { BaseModelStore } from '../../state/base-model.store';
import { PersistanceStore } from '../persistance/persistance.store';
import { User } from '../../models/user.interface';
import { AuthStore } from '../auth/auth.store';
import { AuthStoreActions } from '../auth/auth-store-actions.enum';

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
          retry(3),
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
    const modelSettings = ModelStateSettings[prop];
    if(!modelSettings) throw `No model state settings for property ${prop}`;
    state[prop] = 
        this.arrayHelperService.addOrUpdateRange(this.getStateProperty(prop), response.entities, modelSettings.identifier); 
    state[prop] = 
        this.arrayHelperService.removeRangeByIdentifier(state[prop], response.deletedEntities, modelSettings.identifier);
  } 

  private syncCurrentUser(response: EntitySyncResponse, state: Partial<StoreState>): void{
    state.syncTimestamps.currentUser = response.timestamp; //Update given timestamp
    if(response?.entities?.length > 0) state.currentUser = response.entities[0] as User;
  }

  private handleAuthActions(action: AuthStoreActions){
    switch(action){
      case AuthStoreActions.Login: this.syncAll();
      case AuthStoreActions.Logout: this.purgeAll();
    }
  }

  private getEarliestTimestamp = (): number =>
    this.syncTimestamps ? Object.values(this.syncTimestamps).sort(function(a,b) {return a - b})[0] : 0; 

  private initConfigObserver() {
    const syncIfConfigChanges$ = this.propertyChanges$<SyncStoreConfig>("syncConfig").pipe(skip(1),
      distinctUntilKeyChanged("initialNumberOfMonths"),
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
