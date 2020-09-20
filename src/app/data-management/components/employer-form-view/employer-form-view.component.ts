import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employer } from 'src/app/core/models';
import { ModelFormViewConfig, BaseModelFormViewComponent } from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';

type ViewConfig = ModelFormViewConfig<Employer, Employer>;
type Response = SaveModelStateCommand<Employer>;

@Component({
  selector: 'app-employer-form-view',
  templateUrl: './employer-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployerFormViewComponent extends BaseModelFormViewComponent<Employer, Employer, ViewConfig, Response>
{
  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  constructor(private _formBuilder: FormBuilder){ super(); }

  protected _initalizeForm(cfg: ViewConfig): FormGroup{
    const employer = cfg.entity;
    return this._formBuilder.group({
      id: employer?.id,
      name: [employer?.name, [
        Validators.required,
        Validators.maxLength(200)
      ]],
      phoneNumber: [employer?.phoneNumber, [
        Validators.minLength(4),
        Validators.maxLength(12)
      ]],
      address: [employer?.address, [
        Validators.maxLength(100)
      ]],   
      email: [employer?.email, [
        Validators.email
      ]],
    });
  }

  handleAddressChange(googleAddress){
    this.form.controls['address']
      .setValue(googleAddress.formatted_address);
  }

  get name(){
    return this.form.get('name')
  }

  get phoneNumber(){
    return this.form.get('phoneNumber')
  }

  get address(){
    return this.form.get('address')
  }

  get email(){
    return this.form.get('email')
  }
}
