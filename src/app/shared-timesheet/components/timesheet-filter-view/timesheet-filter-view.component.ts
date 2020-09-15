import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { FilterComponent } from 'src/app/core/filter/interfaces/filter-component.interface';
import { BaseFormViewComponent } from 'src/app/core/form/abstracts/base-form-view-component';
import { Mission } from 'src/app/core/models';
import { DateTimeService } from 'src/app/core/services';
import { DateRangePresets, TimesheetStatus } from 'src/app/shared-app/enums';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { ActiveStringFilterConfig } from 'src/app/shared/interfaces/active-string-filter-config.interface';
import { dateRangeValidator } from 'src/app/shared/validators/date-range.validator';
import { isObjectValidator } from 'src/app/shared/validators/is-object.validator';
import { TimesheetFilterViewConfig } from './timesheet-filter-view-config.interface';

@Component({
  selector: 'app-timesheet-filter-view',
  templateUrl: './timesheet-filter-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetFilterViewComponent extends BaseFormViewComponent<TimesheetFilterViewConfig, TimesheetCriteria>
  implements FilterComponent<TimesheetFilterViewConfig, TimesheetCriteria>{

  timesheetStatus = TimesheetStatus;
  dateRangePresets = DateRangePresets;

  stringFilterConfig: ActiveStringFilterConfig<Mission>;

  constructor(
    private dateTimeService: DateTimeService,
    private _formBuilder: FormBuilder) { super(); }
  
  displayMissionAddress = (mission: Mission): string => 
    mission ? mission.address : null;

  selectMonthHandler(date: Date, datepicker: OwlDateTimeComponent<Date>) {
    this.dateRange.setValue(this.dateTimeService.getMonthRange(date));
    datepicker.close();
  }

  onSubmit = () => {
    const preset = this.dateRangePreset.value;
    
    if(preset !== DateRangePresets.Custom && preset !== DateRangePresets.CustomMonth )
      this.dateRange.setValue(this.dateTimeService.getRangeByDateRangePreset(preset));

    if(this.form.valid && this.form.dirty) 
        this.formSubmitted.emit(this.form.value);
  };
  
  reset = () => {
    this.form.reset({dateRangePreset: DateRangePresets.CurrentYear});
    this.form.markAsDirty()
  }

  isFormNotEmpty = () => {
    for (var key in this.form.value) {  
      if(this.form.value[key]) return true;
    }
  }

  protected _onConfigChanges(){
    super._onConfigChanges();
    this.stringFilterConfig = {
      data: this.config?.state?.missions,
      stringProps: ['id', 'address'],
      initialString: this.config?.criteria?.mission?.address, 
      stringChanges$: this.mission.valueChanges,
      maxChecks: 50,
    }
  }

  protected _initalizeForm(cfg: TimesheetFilterViewConfig): FormGroup { 
    const criteria = cfg?.criteria;
    const disabled = cfg?.disabledFilters;
    console.log(disabled);
    return this._formBuilder.group({
      userName: [{value: criteria?.userName, disabled: disabled?.includes("userName")}],
      mission: [{value: criteria?.mission, disabled: disabled?.includes("mission")}, [
        isObjectValidator(true)
      ]],
      dateRangePreset: [{value: criteria?.dateRangePreset || DateRangePresets.CurrentMonth, disabled: disabled?.includes("dateRangePreset")}],
      dateRange: [{value: criteria?.dateRange, disabled: disabled?.includes("dateRange")}, [
        dateRangeValidator(true)
      ]],  
      status: [{value: criteria?.status, disabled: disabled?.includes("status")}],
    });
  }

  get userName(){
    return this.form.get('userName')
  }
  get mission(){
    return this.form.get('mission')
  }
  get dateRangePreset(){
    return this.form.get('dateRangePreset')
  }
  get dateRange(){
    return this.form.get('dateRange')
  }
  get status(){
    return this.form.get('status')
  }

}
