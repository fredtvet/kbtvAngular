import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimesheetFilter } from '../../interfaces/timesheet-filter.interface';

@Component({
  selector: 'app-timesheet-filter-header',
  templateUrl: './timesheet-filter-header.component.html'
})
export class TimesheetFilterHeaderComponent implements OnInit {

  @Input() filter: TimesheetFilter;
  @Output() filterClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  filterClicked(){
    this.filterClick.emit({...this.filter})
  }

}
