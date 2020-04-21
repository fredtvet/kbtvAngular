import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { TimesheetListFilter } from 'src/app/shared/models';
import { TimesheetStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-timesheet-list-menu',
  templateUrl: './timesheet-list-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetListMenuComponent implements OnInit {
  timesheetStatus = TimesheetStatus;

  @Input() filter: TimesheetListFilter;
  @Output() statusChanged = new EventEmitter();
  @Output() filterClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeStatus(status: TimesheetStatus){
    if (status === this.filter.status) return false;
    this.statusChanged.emit(status);
  }

  openFilter(){
    this.filterClicked.emit();
  }

}
