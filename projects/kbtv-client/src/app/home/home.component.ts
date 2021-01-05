import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Mission } from '@core/models';
import { _sortByDate } from 'array-helpers';
import { Store } from 'state-management'
import { StateMissions } from '@core/state/global-state.interfaces';
import { RolePresets } from '@shared-app/enums/roles.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  RolePresets = RolePresets;

  missionHistory$ = 
    this.store.selectProperty$<Mission[]>("missions").pipe(
      map(x => _sortByDate(x, "lastVisited")?.slice(0,4))
    )

  constructor(private store: Store<StateMissions>) {} 
}
