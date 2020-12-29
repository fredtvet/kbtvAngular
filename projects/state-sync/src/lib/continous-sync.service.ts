import { ApplicationRef, Injectable } from "@angular/core";
import { Store } from 'state-management'
import { concat, interval } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { StoreState } from './interfaces';
import { SyncStateAction } from './state/actions';

@Injectable({providedIn: "root"})
export class ContinousSyncService {

    private get syncTimestamp() { return this.store.state.syncTimestamp }

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
      const timeSinceLastSync = new Date().getTime() - (this.syncTimestamp || 0);
      const syncConfig = this.store.state.syncConfig;
      if(!syncConfig || (timeSinceLastSync > syncConfig.refreshTime)) this.syncAll();             
    }

    private syncAll = () : void => this.store.dispatch(<SyncStateAction>{ type: SyncStateAction })
}