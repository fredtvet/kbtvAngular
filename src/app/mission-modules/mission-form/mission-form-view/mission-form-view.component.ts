import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Mission } from 'src/app/core/models';
import { BaseModelFormViewComponent } from 'src/app/core/services/model/form/abstracts/base-model-form-view.component';
import { ModelFormViewConfig } from 'src/app/core/services/model/form/interfaces';
import { _find } from 'src/app/shared-app/helpers/array/find.helper';

type ViewConfig = ModelFormViewConfig<Mission, Mission>;

@Component({
  selector: 'app-mission-form-view',
  templateUrl: './mission-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFormViewComponent extends BaseModelFormViewComponent<Mission, Mission, ViewConfig>{

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }
  
  isStreetAddress = false;

  constructor(private _formBuilder: FormBuilder) { super(); }

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
