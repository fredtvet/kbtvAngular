import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseModelFormViewComponent, ModelFormViewConfig } from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { Mission, Timesheet } from "src/app/core/models";
import { DateTimeService } from 'src/app/core/services/utility/date-time.service';
import { ActiveStringFilterConfig } from 'src/app/shared/interfaces/active-string-filter-config.interface';
import { TrackByModel } from 'src/app/shared/trackby/track-by-model.helper';
import { isObjectValidator } from 'src/app/shared/validators/is-object.validator';
import { TimesheetForm } from './timesheet-form.interface';

type ViewConfig = ModelFormViewConfig<Timesheet, TimesheetForm>;
type Response = SaveModelStateCommand<Timesheet>;

@Component({
  selector: 'app-user-timesheet-form-view',
  templateUrl: './user-timesheet-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class UserTimesheetFormViewComponent 
  extends BaseModelFormViewComponent<TimesheetForm, Timesheet, ViewConfig, Response>{

  initTime: string = this.getISODate(7)
  minTime: string = this.getISODate(1)
  stringFilterConfig: ActiveStringFilterConfig<Mission>;

  constructor(
    private _formBuilder: FormBuilder,
    private dateHelper: DateTimeService,
    ) {
    super();
  }

  displayMissionAddress = (mission: Mission): string => 
    mission ? mission.address : null;

  trackByMission = TrackByModel("missions");

  protected _onConfigChanges(){
    super._onConfigChanges();
    this.stringFilterConfig = {
      data: this.config?.foreigns?.missions,
      stringProps: ['id', 'address'],
      initialString: this.config?.entity?.mission?.address, 
      stringChanges$: this.mission.valueChanges,
      maxChecks: 50,
    }
  }

  protected _initalizeForm(cfg: ViewConfig): FormGroup { 
    const t = cfg.entity;
    const lockedValues = cfg?.lockedValues;
    return this._formBuilder.group({
      id: t ? t.id : null,
      mission:[{value: lockedValues?.mission || t?.mission, disabled: lockedValues?.mission}, [
        Validators.required,
        isObjectValidator()
      ]],
      date:[{value: this.dateHelper.getISOWithTimezone(lockedValues?.date) || t?.startTime, disabled: lockedValues?.date}, [
        Validators.required,
      ]],   
      startTime: [t?.startTime || this.initTime, [
        Validators.required,
        // dateRangeValidator()
      ]],      
      endTime: [t?.endTime, [
        Validators.required,
        // dateRangeValidator()
      ]],    
      comment: [t?.comment, [
        Validators.required,
        Validators.maxLength(400)
      ]],
    });
  }

  protected _convertFormDataToResponse(): Response{
    let formData = this.form.getRawValue();
    let date = new Date(formData.date).toDateString();
    return {entity: {
      id: formData.id,
      missionId: formData.mission.id,
      comment: formData.comment,
      startTime: new Date(date + " " + new Date(formData.startTime).toTimeString()).toString(),
      endTime: new Date(date + " " + new Date(formData.endTime).toTimeString()).toString(),
    }};   
  }

  private getISODate(hours: number = 0, minutes: number = 0, seconds: number = 0){
    var date  = new Date();
    date.setHours(hours,minutes,seconds,0);
    return this.dateHelper.getISOWithTimezone(date);
  }

  get mission(){
    return this.form.get('mission')
  }

  get date(){
    return this.form.get('date')
  }

  get startTime(){
    return this.form.get('startTime')
  }
  get endTime(){
    return this.form.get('endTime')
  }
  get comment(){
    return this.form.get('comment')
  }


}
