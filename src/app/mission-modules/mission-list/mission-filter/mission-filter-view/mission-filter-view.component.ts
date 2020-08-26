import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Employer, MissionType } from 'src/app/core/models';
import { MissionFilterCriteria } from '../../interfaces/mission-filter-criteria.interface';

@Component({
  selector: 'app-mission-filter-view',
  templateUrl: './mission-filter-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFilterViewComponent {

  @Input() filter: MissionFilterCriteria;
  @Input() employers: Employer[];
  @Input() missionTypes: MissionType[];
  @Output() updateFilter = new EventEmitter<MissionFilterCriteria>();
  
  constructor() { }

  reset = () => this.filter = {finished: false} as MissionFilterCriteria;

  applyFilter = () => this.updateFilter.emit(this.filter);

}
