import { HttpParams } from '@angular/common/http';
import { Injectable, ApplicationRef } from '@angular/core';
import { Observable, interval, concat, Subscription, throwError } from 'rxjs';
import { catchError, distinctUntilKeyChanged, retry, skip, tap, filter, first } from 'rxjs/operators';
import { Notifications } from 'src/app/shared-app/enums';
import { ApiService } from '../api.service';
import { DeviceInfoService } from '../device-info.service';
import { NotificationService } from '../ui/notification.service';
import { ArrayHelperService } from '../utility/array-helper.service';
import { StoreState } from './interfaces/store-state';
import { EntitySyncResponse, SyncResponse } from './interfaces/sync-response.interface';
import { SyncStoreConfig } from './interfaces/sync-store-config.interface';
import { SyncStoreTimestamps } from './interfaces/sync-store-timestamps.interface';
import { SyncStoreActions } from './sync-store-actions.enum';
import { SyncPropertySettings } from './sync-property.settings';
import { AuthStoreActions } from '../auth/auth-store-actions.enum';
import { ModelStateSettings } from '../../state/model-state.settings';
import { BaseModelStore } from '../../state/base-model.store';
import { PersistanceStore } from '../persistance/persistance.store';

@Injectable({
  providedIn: 'root'
})
export class SyncStore extends BaseModelStore<StoreState>{

  syncConfig$: Observable<SyncStoreConfig> = this.property$("syncConfig");

  get syncConfig(): SyncStoreConfig { return this.getProperty("syncConfig"); }

  get syncTimestamps(): SyncStoreTimestamps { return this.getProperty("syncTimestamps"); } 

  private continousSyncSub: Subscription;

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private appRef: ApplicationRef,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService,
    private persistanceStore: PersistanceStore,
  ){
    super(arrayHelperService, apiService, { trackStateHistory: true,logStateChanges: true });

    this.initConfigObserver();
  }

  syncAll() : void{
    if(!this.deviceInfoService.isOnline) return;

    let params = new HttpParams();

    params = params.set("initialNumberOfMonths", this.syncConfig?.initialNumberOfMonths)

    Object.keys(SyncPropertySettings).forEach(prop => {
      let timestamp = this.syncTimestamps ? this.syncTimestamps[prop] : null;
      params = params.set(SyncPropertySettings[prop]?.requestKey, timestamp ? timestamp.toString() : null);
    })

    this.apiService
      .get('/SyncAll', params)
      .pipe(
        retry(3),
        tap(data => this.setSyncResponseState(data)),
        catchError(err => {
            this.notificationService.notify({title: 'Noe gikk feil med synkroniseringen!' , type: Notifications.Error})
            return throwError(err);
        })
      ).subscribe();
  }

  syncIfTimePassed = (): void => {
    const timestamp = this.getEarliestTimestamp();
    const timeSinceLastSync = (new Date().getTime() / 1000) - timestamp;
    if(timeSinceLastSync > this.syncConfig?.refreshTime) this.syncAll();             
  }

  purgeAll = () => {
    let state = {syncTimestamps: {}};
    Object.keys(SyncPropertySettings).forEach(prop => state[prop] = null);
    this._setStateVoid(state, SyncStoreActions.StorePurge)
  };

  updateSyncConfig = (syncConfig: SyncStoreConfig): void =>
    this._setStateVoid({syncConfig}, SyncStoreActions.UpdateSyncConfig);

  handleLogout(): void{
      this.purgeAll();
      if(this.continousSyncSub) this.continousSyncSub.unsubscribe();
  }
  
  handleLogin(): void{
      this.syncAll();
      if(!this.continousSyncSub) 
        this.continousSyncSub = this.continousSync$.subscribe();
  }

  private setSyncResponseState(response: SyncResponse){
    let state = {syncTimestamps: {}};

    Object.keys(SyncPropertySettings).forEach(prop => 
      this.syncLocalEntityResponse(prop, response[SyncPropertySettings[prop]?.responseKey], state));
      
    this._setStateVoid(state, SyncStoreActions.StoreSync)
  }

  private syncLocalEntityResponse(prop: string, response: EntitySyncResponse, state: Partial<StoreState>): void{
    if(!response || !prop) return;
    state.syncTimestamps[prop] = response.timestamp; //Update given timestamp

    state[prop] = 
        this.arrayHelperService.addOrUpdateRange(this.getStateProperty(prop), response.entities, ModelStateSettings[prop].identifier); 

    state[prop] = 
        this.arrayHelperService.removeRangeByIdentifier(state[prop], response.deletedEntities, ModelStateSettings[prop].identifier);
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
    const continousSync$ = interval(1000*60*3).pipe(tap(x => this.syncIfTimePassed()));  
    return concat(appIsStable$, continousSync$);
  }
}
