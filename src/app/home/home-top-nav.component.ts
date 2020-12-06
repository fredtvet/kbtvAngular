import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '../core/services/loading.service';
import { SyncStateActionId } from '../core/services/sync/state/actions.const';
import { MainNavService } from '../layout/main-nav.service';
import { Store } from '../state/store';

@Component({
  selector: 'app-home-top-nav',
  templateUrl: 'home-top-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTopNavComponent{

    loading$ = this.loadingService.queryLoading$;

    constructor(
        private store: Store<any>,
        private loadingService: LoadingService,
        private mainNavService: MainNavService,
    ) {  }

    toggleDrawer = () => this.mainNavService.toggleDrawer();

    refresh = () => this.store.dispatch({ actionId: SyncStateActionId });
}
