import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Timesheet } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-mission-bar',
  templateUrl: './timesheet-mission-bar.component.html',
  styleUrls: ['./timesheet-mission-bar.component.scss'],
})
export class TimesheetMissionBarComponent {
  
  @Input() timesheet: Timesheet;
  @Output() barClicked = new EventEmitter();

  constructor() { }
  
  clickBar(): void { this.barClicked.emit(this.timesheet.id); }

}
