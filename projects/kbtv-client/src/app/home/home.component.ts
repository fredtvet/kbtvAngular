import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { Mission } from '@core/models';
import { Roles } from '@core/roles.enum';
import { StateMissions } from '@core/state/global-state.interfaces';
import { _sortByDate } from 'array-helpers';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
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

  missionHistory$ = 
    this.store.selectProperty$<Mission[]>("missions").pipe(
      map(x => _sortByDate(x, "lastVisited")?.slice(0,10))
    )

  constructor(private store: Store<StateMissions>) {} 

}
