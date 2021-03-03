import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StateCurrentUser } from 'state-auth';
import { Store } from 'state-management';
import { StateSyncTimestamp, SyncStateAction } from 'state-sync';
import { MainNavService } from '../../layout/main-nav.service';

@Component({
  selector: 'app-home-bottom-bar',
  templateUrl: 'home-bottom-bar.component.html', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBottomBarComponent{

    constructor(
        private store: Store<StateCurrentUser & StateSyncTimestamp>,
        private mainNavService: MainNavService,
    ) {  }

    toggleDrawer = () => this.mainNavService.toggleDrawer();

    refresh = () => this.store.dispatch(<SyncStateAction>{ type: SyncStateAction, propagate: true });
}
