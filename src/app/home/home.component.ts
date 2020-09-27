import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mission } from 'src/app/core/models';
import { SyncStore } from 'src/app/core/services/sync';
import { MainNavService } from 'src/app/layout';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { SorterService } from '../core/services/utility/sorter.service';
import { HomeTopNavComponent } from './home-top-nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  Roles = Roles;
  rolePresets = RolePresets;

  missionHistory$: Observable<Mission[]>;

  constructor(
    private syncStore: SyncStore,
    private mainNavService: MainNavService,
    private sorterService: SorterService) {
     this.configureMainNav();
  }

  ngOnInit() {
    this.missionHistory$ = this.syncStore.missions$.pipe(
      filter(x => x != null),
      map(x => {
        this.sorterService.sortByDate(x, "lastVisited", "desc");
        return x.slice(0,4);
    }))
  }
  
  private configureMainNav(){
    this.mainNavService.addConfig({
      topNavComponent: HomeTopNavComponent, topNavConfig: {}
    });
  }
  

}
