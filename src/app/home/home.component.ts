import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission } from 'src/app/core/models';
import { RolePresets } from 'src/app/shared-app/enums';
import { _sortByDate } from '../shared-app/helpers/array/sort-by-date.helper';
import { StateMissions } from '../state/interfaces';
import { Store } from '../state/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  RolePresets = RolePresets;

  missionHistory$: Observable<Mission[]> = 
    this.store.selectProperty$<Mission[]>("missions").pipe(
      map(x => _sortByDate(x, "lastVisited")?.slice(0,4))
    )

  constructor(private store: Store<StateMissions>) {} 
}
