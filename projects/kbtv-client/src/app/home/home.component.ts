import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission } from '@core/models';
import { RolePresets } from '@shared-app/enums';
import { _sortByDate } from '@array/sort-by-date.helper';
import { Store } from '@state/store';
import { StateMissions } from '@core/state/global-state.interfaces';

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
