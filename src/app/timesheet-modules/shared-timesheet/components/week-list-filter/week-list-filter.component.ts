import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-week-list-filter',
  templateUrl: './week-list-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekListFilterComponent {

  @Input() year: number;
  @Input() userName: string;
  @Input() users: string;
  @Output() filterChanged = new EventEmitter();

  currentYear = new Date().getFullYear();

  constructor() { }

  applyFilter = () => this.filterChanged.emit({year: this.year, userName: this.userName});
  

}
