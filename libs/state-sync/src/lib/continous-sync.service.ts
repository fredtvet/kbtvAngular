import { ApplicationRef, Injectable } from "@angular/core";
import { Store } from 'state-management'
import { filter, first, tap } from 'rxjs/operators';
import { SyncStateAction } from './state/actions';
import { StoreState } from "./store-state.interface";
import { concat, fromEvent, interval, merge, of } from "rxjs";

/** Root service responsible for keeping system synchronized */
@Injectable({providedIn: "root"})
export class ContinousSyncService {

    private get syncTimestamp() { return this.store.state.syncTimestamp }

    constructor(
        private appRef: ApplicationRef,
        private store: Store<StoreState>,
    ) { }
  
    /** Initalizes the synchronization clock. */
    initalize(): void {
      merge(
        fromEvent(window, 'online'),
        of(navigator.onLine).pipe(filter(x => x === true))
      ).pipe(
        first()
      ).subscribe(x => this.syncAll())
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