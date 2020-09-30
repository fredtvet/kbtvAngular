import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SyncStore } from 'src/app/core/services/sync';
import { LoadingService } from '../core/services/loading.service';
import { MainNavService } from '../layout/main-nav.service';

@Component({
  selector: 'app-home-top-nav',
  templateUrl: 'home-top-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTopNavComponent{

    loading$ = this.loadingService.queryLoading$;

    constructor(
        private syncStore: SyncStore,
        private loadingService: LoadingService,
        private mainNavService: MainNavService,
    ) {  }

    toggleDrawer = () => this.mainNavService.toggleDrawer();

    refresh = () => this.syncStore.syncAll();
}
