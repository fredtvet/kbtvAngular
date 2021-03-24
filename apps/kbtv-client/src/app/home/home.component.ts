import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { Mission } from '@core/models';
import { Roles } from '@core/roles.enum';
import { StateMissions } from '@core/state/global-state.interfaces';
import { _sortByDate } from 'array-helpers';
import { Immutable } from 'global-types';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateCurrentUser } from 'state-auth';
import { Store } from 'state-management';
import { StateSyncTimestamp, SyncStateAction } from 'state-sync';
import { MainNavService } from '../layout/main-nav.service';
import { HomeNavigations } from './home-navigations.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @HostBinding("style.width") width: string = "100%"
  
  permissions = RolePermissions;
  roles = Roles;
  navigations = HomeNavigations;

  vm$: Observable<Immutable<StateCurrentUser & StateSyncTimestamp & StateMissions>> = 
      combineLatest([
        this.store.select$(["currentUser", "syncTimestamp"]),
        this.store.selectProperty$<Mission[]>("missions").pipe(
          map(x => _sortByDate(x, "lastVisited")?.slice(0,10))
        )
      ]).pipe(
        map(([state, missions]) => { 
          return <Immutable<StateCurrentUser & StateSyncTimestamp & StateMissions>> {...state, missions} 
        })
      );
    

  constructor(
    private store: Store<StateCurrentUser & StateSyncTimestamp & StateMissions>,
    private mainNavService: MainNavService,
  ){} 

  toggleDrawer = () => this.mainNavService.toggleDrawer();

  refresh = () => this.store.dispatch(<SyncStateAction>{ type: SyncStateAction, propagate: true });

}
