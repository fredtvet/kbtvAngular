import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Immutable } from 'global-types';
import { Observable } from 'rxjs';
import { StateCurrentUser } from 'state-auth';
import { Store } from 'state-management';
import { StateSyncTimestamp, SyncStateAction } from 'state-sync';
import { MainNavService } from '../../layout/main-nav.service';

@Component({
  selector: 'app-home-header',
  templateUrl: 'home-header.component.html', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHeaderComponent{

    vm$: Observable<Immutable<StateCurrentUser & StateSyncTimestamp>> = 
      this.store.select$(["currentUser", "syncTimestamp"])

    constructor(
        private store: Store<StateCurrentUser & StateSyncTimestamp>,
        private mainNavService: MainNavService,
    ) {  }

    toggleDrawer = () => this.mainNavService.toggleDrawer();

    refresh = () => this.store.dispatch(<SyncStateAction>{ type: SyncStateAction, propagate: true });

}
