import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { Mission } from '@core/models';
import { StateMissions } from '@core/state/global-state.interfaces';
import { Roles } from '@core/roles.enum';
import { _sortByDate } from 'array-helpers';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  permissions = RolePermissions;
  roles = Roles;

  missionHistory$ = 
    this.store.selectProperty$<Mission[]>("missions").pipe(
      map(x => _sortByDate(x, "lastVisited")?.slice(0,4))
    )

  constructor(private store: Store<StateMissions>) {} 
}
