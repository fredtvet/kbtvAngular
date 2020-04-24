import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DateRangePresets } from '../../enums/date-range-presets.enum';
import { TimesheetStatus } from '../../enums/timesheet-status.enum';
import { Mission } from '../../models/mission.model';
import { DateTimeService } from 'src/app/core/services/utility/date-time.service';
import { TimesheetFilter } from '../../interfaces';
import { User } from '../../models/user.model';
import { OwlDateTimeComponent } from 'ng-pick-datetime';

@Component({
  selector: 'app-timesheet-filter',
  templateUrl: './timesheet-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetFilterComponent {

  timesheetStatus = TimesheetStatus;
  dateRangePresets = DateRangePresets;

  @Input() missions: Mission[] = [];
  @Input() users: User[] = [];
  @Input() filterPreset: TimesheetFilter;
  @Input() disabledFilters: string[] = [];

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

  displayFnMission(mission: Mission): string {
    if(mission == undefined) return null;
    return mission.address;
  }

  chosenMonthHandler(date: Date, datepicker: OwlDateTimeComponent<Date>) {
    this.filterPreset.dateRange = this.dateTimeService.getMonthRange(date);
    datepicker.close();
  }
}
