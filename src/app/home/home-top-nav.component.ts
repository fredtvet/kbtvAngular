import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { MainNavService } from '../layout/main-nav.service';
import { Store } from '@state/store';
import { SyncStateAction } from '@sync/state/actions';

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

    refresh = () => this.store.dispatch(<SyncStateAction>{ type: SyncStateAction, propagate: true });
}
