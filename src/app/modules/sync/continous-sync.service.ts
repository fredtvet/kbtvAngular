import { ApplicationRef, Injectable } from "@angular/core";
import { interval, concat } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper';
import { Store } from '@state/store';
import { StoreState, SyncConfig, SyncStoreTimestamps } from './interfaces';
import { SyncStateActionId } from './state/actions.const';

@Injectable({providedIn: "root"})
export class ContinousSyncService {
  
    constructor(
        private appRef: ApplicationRef,
        private store: Store<StoreState>,
    ) { }
  
    initalize(): void {
      this.syncAll()
      this.continousSync$.subscribe();
    }
      
    private get continousSync$(){
        const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
        const continousSync$ = interval(1000*60*3).pipe(tap(x => this.syncIfTimePassed()));  
        return concat(appIsStable$, continousSync$);
    }

    private syncIfTimePassed = (): void => {
      const timestamp = this.getEarliestTimestamp();
      const timeSinceLastSync = _getUnixTimeSeconds() - timestamp;
      const syncConfig = this.store.selectProperty<SyncConfig>("syncConfig");
      if(timeSinceLastSync > syncConfig?.refreshTime) this.syncAll();             
    }
  
    private getEarliestTimestamp = (): number =>{
      const timestamps =  this.store.selectProperty<SyncStoreTimestamps>("syncTimestamps");
      return timestamps ? Object.values(timestamps).sort(function(a,b) {return a - b})[0] : 0; 
    }

    private syncAll = () : void => 
        this.store.dispatch({ actionId: SyncStateActionId })
}