import { HttpParams } from '@angular/common/http';
import { Injectable, ApplicationRef } from '@angular/core';
import { Observable, interval, concat, Subscription } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class SyncStore extends BaseModelStore<StoreState>{

  syncConfig$: Observable<SyncStoreConfig> = this.property$("syncConfig");

  get syncConfig(): SyncStoreConfig { return this.getProperty("syncConfig"); }

  get syncTimestamps(): SyncStoreTimestamps { return this.getProperty("timestamps"); } 

  private continousSyncSub: Subscription;

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private appRef: ApplicationRef,
    private deviceInfoService: DeviceInfoService,
    private notificationService: NotificationService,
  ){
    super(arrayHelperService, apiService, { trackStateHistory: true,logStateChanges: true });

    this.initConfigIfNull();

    this.globalStateChanged.pipe(filter(x => x != null), tap(x => this.stateActionHandler(x.lastAction))).subscribe();
    
    this.syncAll();

    this.propertyChanges$<SyncStoreConfig>("syncConfig").pipe(skip(1),
      distinctUntilKeyChanged("initialNumberOfMonths"),
      tap(x => {
        this.purgeAll();
        this.syncAll();
      })
    ).subscribe();
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
            throw err;
        })
      ).subscribe();
  }

  syncIfTimePassed = (): void => {
    const timestamp = this.getEarliestTimestamp();
    const timeSinceLastSync = (new Date().getTime() / 1000) - timestamp;
    if(timeSinceLastSync > this.syncConfig?.refreshTime) this.syncAll();             
  }

  purgeAll = () => {
    let state = {timestamps: {}};
    Object.keys(SyncPropertySettings).forEach(prop => state[prop] = null);
    this.setState(state, SyncStoreActions.StorePurge)
  };

  updateSyncConfig = (syncConfig: SyncStoreConfig): void =>
    this._setStateVoid({syncConfig}, SyncStoreActions.UpdateSyncConfig);

  private setSyncResponseState(response: SyncResponse){
    let state = {timestamps: {}};

    Object.keys(SyncPropertySettings).forEach(prop => 
      this.syncLocalEntityResponse(prop, response[SyncPropertySettings[prop]?.responseKey], state));
      
    this.setState(state, SyncStoreActions.StoreSync)
  }

  private syncLocalEntityResponse(prop: string, response: EntitySyncResponse, state: Partial<StoreState>): void{
    if(!response || !prop) return;
    state.timestamps[prop] = response.timestamp; //Update given timestamp

    state[prop] = 
        this.arrayHelperService.addOrUpdateRange(this.getStateProperty(prop), response.entities, ModelStateSettings[prop].identifier); 

    state[prop] = 
        this.arrayHelperService.removeRangeByIdentifier(state[prop], response.deletedEntities, ModelStateSettings[prop].identifier);
  } 

  private stateActionHandler(action: string){
    switch(action){
      case AuthStoreActions.Logout: this.handleLogout(); break;
      case AuthStoreActions.Login: this.handleLogin(); break;
      default: break;
    }
  }

  private handleLogout(): void{
    this.purgeAll();
    if(this.continousSyncSub) this.continousSyncSub.unsubscribe();
  }

  private handleLogin(): void{
    this.syncAll();
    if(!this.continousSyncSub) 
      this.continousSyncSub = this.continousSync$.subscribe();
  }

  private getEarliestTimestamp = (): number =>
    this.syncTimestamps ? Object.values(this.syncTimestamps).sort(function(a,b) {return a - b})[0] : 0; 

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
