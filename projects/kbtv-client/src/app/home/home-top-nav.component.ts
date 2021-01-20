import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { MainNavService } from '../layout/main-nav.service';
import { Store } from 'state-management'
import { StateSyncTimestamp, SyncStateAction } from 'state-sync';
import { StateCurrentUser } from 'state-auth';
import { User } from '@core/models';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Immutable } from '../../../../../dist/global-types/public-api';

interface ViewModel extends Immutable<StateCurrentUser> {loading: boolean, syncTimestamp: number}

@Component({
  selector: 'app-home-top-nav',
  templateUrl: 'home-top-nav.component.html',
  styleUrls: ['home-top-nav.component.scss'],  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTopNavComponent{

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
