import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employer } from 'src/app/shared/interfaces/models';

@Component({
  selector: 'app-employer-form-view',
  templateUrl: './employer-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployerFormViewComponent implements OnInit
{
  @Input() employer: Employer;
  @Output() formSubmitted = new EventEmitter();

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  employerForm: FormGroup;
  isCreateForm: boolean = false;

  constructor(
    private _formBuilder: FormBuilder){ }

    ngOnInit(){
      if(this.employer || this.employer == null) this.isCreateForm = true;
      this.initalizeForm(this.employer);
    }
    
    private initalizeForm(x: Employer){
      this.employerForm = this._formBuilder.group({
        id: x ? x.id : null,
        name: [x ? x.name : null, [
          Validators.required,
          Validators.maxLength(200)
        ]],
        phoneNumber: [x ? x.phoneNumber : null, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        address: [x ? x.address : null, [
          Validators.maxLength(100)
        ]],   
        email: [x ? x.email : null, [
          Validators.email
        ]],
      });
    }

    onSubmit(){
      const {value, valid} = this.employerForm;
      if(valid && this.employerForm.dirty) this.formSubmitted.emit(value);
    }

    handleAddressChange(googleAddress){
      this.employerForm.controls['address']
        .setValue(googleAddress.formatted_address);
    }

    get name(){
      return this.employerForm.get('name')
    }

    get phoneNumber(){
      return this.employerForm.get('phoneNumber')
    }

    get address(){
      return this.employerForm.get('address')
    }
    get email(){
      return this.employerForm.get('email')
    }
}
