import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseModelFormViewComponent, ModelFormViewConfig } from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { Mission, Timesheet } from "src/app/core/models";
import { ActiveStringFilterConfig } from 'src/app/shared/interfaces/active-string-filter-config.interface';
import { TrackByModel } from 'src/app/shared/trackby/track-by-model.helper';
import { dateRangeValidator } from 'src/app/shared/validators/date-range.validator';
import { isObjectValidator } from 'src/app/shared/validators/is-object.validator';
import { TimesheetForm } from './timesheet-form.interface';

type ViewConfig = ModelFormViewConfig<Timesheet, TimesheetForm>;
type Response = SaveModelStateCommand<Timesheet>;

@Component({
  selector: 'app-user-timesheet-form-view',
  templateUrl: './user-timesheet-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetFormViewComponent 
  extends BaseModelFormViewComponent<TimesheetForm, Timesheet, ViewConfig, Response>{

  initTime: Date = new Date();
  stringFilterConfig: ActiveStringFilterConfig<Mission>;

  constructor(private _formBuilder: FormBuilder) {
    super();
    this.initTime.setHours(6,0,0,0);
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
      mission: [{value: lockedValues?.mission || t?.mission, disabled: lockedValues?.mission}, [
        Validators.required,
        isObjectValidator()
      ]],
      date: [{value: lockedValues?.date || (t?.startTime ? new Date(t.startTime) : null), disabled: lockedValues?.date}, [
        Validators.required
      ]],
      timeRange: [(t?.startTime && t?.endTime) ? [new Date(t.startTime), new Date(t.endTime)] : [],[
        Validators.required,
        dateRangeValidator()
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
      startTime: new Date(date + " " + formData.timeRange[0].toTimeString()).toString(),
      endTime: new Date(date + " " + formData.timeRange[1].toTimeString()).toString(),
    }};   
  }

  get mission(){
    return this.form.get('mission')
  }

  get date(){
    return this.form.get('date')
  }

  get timeRange(){
    return this.form.get('timeRange')
  }

  get comment(){
    return this.form.get('comment')
  }


}
