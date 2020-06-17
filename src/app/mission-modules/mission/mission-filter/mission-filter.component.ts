import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MissionsFacade } from '../missions.facade';
import { MissionTypeService, EmployerService } from 'src/app/core/services';
import { MissionFilter } from '../mission.filter';

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

  missionTypes$ = this.missionTypeService.getAll$();
  employers$ = this.employerService.getAll$();
  filter$ = this.missionsFacade.filter$;

  constructor(
    private missionsFacade: MissionsFacade,
    private missionTypeService: MissionTypeService,
    private employerService: EmployerService,
  ) { }

  updateFilter(filter: MissionFilter){
    console.log(filter);
    if(filter) this.missionsFacade.addFilter(filter);
    this.filterUpdated.emit(null);
  }

}
