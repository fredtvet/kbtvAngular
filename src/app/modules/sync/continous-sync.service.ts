import { ApplicationRef, Injectable } from "@angular/core";
import { interval, concat } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { _getUnixTimeSeconds } from '@datetime/get-unix-time-seconds.helper';
import { Store } from '@state/store';
import { StoreState, SyncConfig } from './interfaces';
import { SyncStateActionId } from './state/actions.const';

@Injectable({providedIn: "root"})
export class ContinousSyncService {

    private get syncTimestamp(): number { return this.store.selectProperty("syncTimestamp") }

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
      const timeSinceLastSync = _getUnixTimeSeconds() - this.syncTimestamp;
      const syncConfig = this.store.selectProperty<SyncConfig>("syncConfig");
      if(timeSinceLastSync > syncConfig?.refreshTime) this.syncAll();             
    }

    private syncAll = () : void => 
        this.store.dispatch({ actionId: SyncStateActionId })
}