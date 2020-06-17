import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { MissionFilter } from '../../mission.filter';
import { Employer, MissionType } from 'src/app/core/models';

@Component({
  selector: 'app-mission-filter-view',
  templateUrl: './mission-filter-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFilterViewComponent implements OnInit {

  @Input() filter: MissionFilter;
  @Input() employers: Employer[];
  @Input() missionTypes: MissionType[];
  @Output() updateFilter = new EventEmitter<MissionFilter>();
  
  constructor() { }

  ngOnInit(): void {
  }

  reset = () => this.updateFilter.emit(new MissionFilter());

  applyFilter = () => this.updateFilter.emit(this.filter);

}
