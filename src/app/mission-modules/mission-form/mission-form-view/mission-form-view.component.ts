import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseModelFormViewComponent, ModelFormViewConfig } from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { Mission, MissionType, Employer } from 'src/app/core/models';
import { ArrayHelperService } from 'src/app/core/services';

type ViewConfig = ModelFormViewConfig<Mission, Mission>;
type Response = SaveModelStateCommand<Mission>;

@Component({
  selector: 'app-mission-form-view',
  templateUrl: './mission-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFormViewComponent extends BaseModelFormViewComponent<Mission, Mission, ViewConfig, Response>{

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }
  
  isStreetAddress = false;

  constructor(private arrayHelperService: ArrayHelperService, private _formBuilder: FormBuilder) { super(); }

  handleAddressChange(googleAddress){
    this.form?.controls['address']
      .setValue(googleAddress.formatted_address);
  }

  protected _initalizeForm(cfg: ViewConfig): FormGroup{
    const mission = cfg.entity;
    return this._formBuilder.group({
      id: mission?.id,
      address: [mission?.address, [
        Validators.required,
        Validators.maxLength(100)
      ]],
      phoneNumber: [mission?.phoneNumber, [
        Validators.minLength(4),
        Validators.maxLength(12)
      ]],
      description: [mission?.description, [
        Validators.maxLength(400)
      ]],
      employer: this._formBuilder.group({
        name: mission?.employer?.name
      }),
      missionType: this._formBuilder.group({
        name: mission?.missionType?.name
      }),
      finished: mission?.finished
    });
  }

  protected _convertFormDataToResponse(): Response{
    let mission = this.form.getRawValue();

    let existingType: MissionType;
    let existingEmployer: Employer;

    if(this.config?.foreigns){
      existingType = 
        this.arrayHelperService.find(this.config.foreigns.missionTypes, mission.missionType.name, "name");
      existingEmployer = 
        this.arrayHelperService.find(this.config.foreigns.employers, mission.employer.name, "name");
    }
   
    if(existingType) mission.missionTypeId = existingType.id;
    
    if(!mission.missionType.name) mission.missionTypeId = null;

    if(existingType || !mission.missionType.name) mission.missionType = null;

    if(existingEmployer) mission.employerId = existingEmployer.id;

    if(!mission.employer.name) mission.employerId = null;

    if(existingEmployer || !mission.employer.name) mission.employer = null;

    return {entity: mission};
  }

  get address(){
    return this.form.get('address')
  }

  get phoneNumber(){
    return this.form.get('phoneNumber');
  }

  get description(){
    return this.form.get('description')
  }

  get employerName(){
    return this.form.get(['employer', 'name'])
  }

  get missionTypeName(){
    return this.form.get(['missionType','name'])
  }

  get finished(){
    return this.form.get('finished')
  }
}
