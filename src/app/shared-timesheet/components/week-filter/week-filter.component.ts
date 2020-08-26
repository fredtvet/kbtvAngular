import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { WeekFilterConfig, WeekFilterCriteria } from './week-filter-config.interface';

@Component({
  selector: 'app-week-filter',
  templateUrl: './week-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekFilterComponent {

  @Input() config: WeekFilterConfig;
  @Output() filterChanged = new EventEmitter<WeekFilterCriteria>();

  constructor() { }

  applyFilter = () => this.filterChanged.emit(this.config.filter); 

}
