import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Mission, TimesheetListFilter } from 'src/app/shared/models';
import { TimesheetStatus, DateRangePresets } from 'src/app/shared/enums';
import { DateTimeService } from 'src/app/core/services';

@Component({
  selector: 'app-timesheet-list-filter',
  templateUrl: './timesheet-list-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetListFilterComponent {

  timesheetStatus = TimesheetStatus;
  dateRangePresets = DateRangePresets;

  @Input() missions: Mission[] = [];
  @Input() filterPreset: TimesheetListFilter;

  @Output() filterChanged = new EventEmitter();

  constructor(private dateTimeService: DateTimeService) {}

  updateDateRangePreset(preset: DateRangePresets){
    this.filterPreset.dateRangePreset = preset;
    this.filterPreset.dateRange = this.dateTimeService.getRangeByDateRangePreset(preset);
  }

  applyFilter(){
    this.filterChanged.emit(this.filterPreset);
  }

  close(){
    this.filterChanged.emit();
  }

  displayFn(mission: Mission): string {
    if(mission == undefined) return null;
    return mission.address;
  }
}
