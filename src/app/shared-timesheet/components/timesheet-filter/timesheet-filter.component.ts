import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { Mission, User } from 'src/app/core/models';
import { DateRangePresets, TimesheetStatus } from 'src/app/shared-app/enums';
import { TimesheetCriteria } from 'src/app/shared/interfaces';
import { DateTimeService } from 'src/app/core/services';

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
  @Input() filter: TimesheetCriteria = {};
  @Input() disabledFilters: string[] = [];

  @Output() filterChanged = new EventEmitter();

  constructor(private dateTimeService: DateTimeService) {}

  updateDateRangePreset(preset: DateRangePresets){
    this.filter.dateRangePreset = preset;
  }

  applyFilter = () => this.filterChanged.emit(this.filter);
  
  reset = () => this.filter = {dateRangePreset: DateRangePresets.CurrentYear};

  displayFnMission(mission: Mission): string {
    if(mission == undefined) return null;
    return mission.address;
  }

  selectMonthHandler(date: Date, datepicker: OwlDateTimeComponent<Date>) {
    this.filter.dateRange = this.dateTimeService.getMonthRange(date);
    datepicker.close();
  }
}
