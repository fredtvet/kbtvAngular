import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission } from 'src/app/core/models';
import { SyncStore } from 'src/app/core/services/sync';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { _sortByDate } from '../shared-app/helpers/array/sort-by-date.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  Roles = Roles;

  rolePresets = RolePresets;

  missionHistory$: Observable<Mission[]> = this.syncStore.missions$.pipe(
    map(x => _sortByDate(x, "lastVisited")?.slice(0,4))
  )

  constructor(private syncStore: SyncStore) {}
  
}
