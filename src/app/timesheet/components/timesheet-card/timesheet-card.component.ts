import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Timesheet } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrls: ['./timesheet-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetCardComponent {

  @Input() timesheet: Timesheet;
  @Output() confirmed = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  deleteTimesheet = () => this.deleted.emit(this.timesheet.id);

  confirmTimesheet = () => this.confirmed.emit(this.timesheet.id);
}
