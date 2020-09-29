import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseModelFormViewComponent, ModelFormViewConfig } from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { Mission, Timesheet } from "src/app/core/models";
import { _getISOWithTimezone } from 'src/app/shared-app/helpers/datetime/get-iso-with-timezone.helper';
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

  initTime: string = _getISOWithTimezone(this.getDateWithTime(7))

  stringFilterConfig: ActiveStringFilterConfig<Mission>;

  constructor(private _formBuilder: FormBuilder) {super();}

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
    const startTimeIso = t?.startTime ? new Date(t?.startTime).toISOString() : null;
    const date = lockedValues?.date;

    return this._formBuilder.group({
      id: t ? t.id : null,
      mission:[{value: lockedValues?.mission || t?.mission, disabled: lockedValues?.mission}, [
        Validators.required,
        isObjectValidator()
      ]],
      date:[{value: date ? new Date(date).toISOString() : startTimeIso, disabled: date}, [
        Validators.required,
        
      ]],   
      startTime: [startTimeIso || this.initTime, [
        Validators.required,
      ]],      
      endTime: [t?.endTime ? new Date(t.endTime).toISOString() : null, [
        Validators.required,
      ]],    
      comment: [t?.comment, [
        Validators.required,
        Validators.maxLength(400)
      ]],
    });
  }

  protected _convertFormDataToResponse(): Response{
    let formData: TimesheetForm = this.form.getRawValue();
    const res = {entity: {
      id: formData.id,
      missionId: formData.mission.id,
      comment: formData.comment,
      startTime: this.mergeDateAndTime(formData.date, formData.startTime).getTime(),
      endTime:  this.mergeDateAndTime(formData.date, formData.endTime).getTime(),
    }};   
    return res;
  }

  private mergeDateAndTime(date: any, time:any): Date{
    const d = new Date(date);
    const t = new Date(time);
    d.setHours(t.getHours(), t.getMinutes(), t.getSeconds());
    return d;
  }

  private getDateWithTime(date: any, hours: number = 0, minutes: number = 0, seconds: number = 0){
    var d  = date ? new Date(date) : new Date();
    d.setHours(hours,minutes,seconds,0);
    return d;
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
