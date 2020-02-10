import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employer } from 'src/app/shared';

@Component({
  selector: 'app-employer-form-view',
  templateUrl: './employer-form-view.component.html'
})

export class EmployerFormViewComponent implements OnInit
{
  @Input() employer: Employer;
  @Output() submit = new EventEmitter();

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  employerForm: FormGroup;

  isCreateForm: boolean = false;

  constructor(
    private _formBuilder: FormBuilder){ }

    ngOnInit(){
      if(this.employer == null){
        this.employer = new Employer();
        this.isCreateForm = true;
      }
      this.initalizeForm();
    }

    initalizeForm(){
      this.employerForm = this._formBuilder.group({
        id: this.employer.id,
        name: [this.employer.name, [
          Validators.required,
          Validators.maxLength(200)
        ]],
        phoneNumber: [this.employer.phoneNumber, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        address: [this.employer.address, [
          Validators.maxLength(100)
        ]]
      });
    }

    onSubmit(){
      const {value, valid} = this.employerForm;
      if(valid) this.submit.emit(value);
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

}
