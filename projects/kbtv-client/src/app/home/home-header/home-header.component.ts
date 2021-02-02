import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { Immutable } from 'global-types';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateCurrentUser } from 'state-auth';
import { Store } from 'state-management';
import { StateSyncTimestamp, SyncStateAction } from 'state-sync';
import { MainNavService } from '../../layout/main-nav.service';

interface ViewModel extends Immutable<StateCurrentUser> {loading: boolean, syncTimestamp: number}

@Component({
  selector: 'app-home-header',
  templateUrl: 'home-header.component.html', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHeaderComponent{

    vm$: Observable<ViewModel> = combineLatest([
      this.loadingService.queryLoading$,
      this.store.select$(["currentUser", "syncTimestamp"]),
    ]).pipe(map(([loading, state]) => { return <ViewModel> {...state, loading} }))

    constructor(
        private store: Store<StateCurrentUser & StateSyncTimestamp>,
        private loadingService: LoadingService,
        private mainNavService: MainNavService,
    ) {  }

    toggleDrawer = () => this.mainNavService.toggleDrawer();

    refresh = () => this.store.dispatch(<SyncStateAction>{ type: SyncStateAction, propagate: true });
}
