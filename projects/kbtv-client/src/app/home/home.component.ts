import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { Mission } from '@core/models';
import { Roles } from '@core/roles.enum';
import { StateMissions } from '@core/state/global-state.interfaces';
import { _sortByDate } from 'array-helpers';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  permissions = RolePermissions;
  roles = Roles;

  missionHistory$ = 
    this.store.selectProperty$<Mission[]>("missions").pipe(
      map(x => _sortByDate(x, "lastVisited")?.slice(0,10))
    )

  constructor(private store: Store<StateMissions>) {} 

}
