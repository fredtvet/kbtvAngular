import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MissionListStore } from '../mission-list.store';
import { MissionFilterCriteria } from '../interfaces/mission-filter-criteria.interface';

@Component({
  selector: 'app-mission-filter',
  template: `
    <app-mission-filter-view 
      [missionTypes]="missionTypes$ | async"
      [employers]="employers$ | async"
      [filter]="filter$ | async"
      (updateFilter)="updateFilter($event)">
    </app-mission-filter-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFilterComponent {
  @Output() filterUpdated = new EventEmitter();

  missionTypes$ = this.store.property$("missionTypes");
  employers$ = this.store.property$("employers");
  filter$ = this.store.property$("missionCriteria");

  constructor(private store: MissionListStore) { }

  updateFilter(criteria: MissionFilterCriteria){
    this.store.addCriteria(criteria);
    this.filterUpdated.emit(null);
  }

}
