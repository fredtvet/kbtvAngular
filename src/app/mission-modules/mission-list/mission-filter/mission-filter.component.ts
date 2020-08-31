import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MissionListStore } from '../mission-list.store';
import { MissionFilterCriteria } from '../../../shared/interfaces/mission-filter-criteria.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mission-filter',
  template: `
    <app-mission-filter-view 
      [config]="filterConfig$ | async"
      [criteria]="criteria$ | async"
      (searchUpdated)="updateSearch($event)"
      (formSubmitted)="updateFilter($event)">
    </app-mission-filter-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFilterComponent {
  @Output() filterUpdated = new EventEmitter();

  filterConfig$ = this.store.filterConfig$;
  criteria$ = this.store.property$<MissionFilterCriteria>("missionCriteria");

  constructor(private store: MissionListStore) { }

  updateFilter(criteria: MissionFilterCriteria){
    this.store.addCriteria(criteria);
    this.filterUpdated.emit(null);
  }

  updateSearch(search: string){
    this.store.addSearch(search);
  }

}
