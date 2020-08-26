import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/core/models";

@Component({
  selector: "app-profile-form-view",
  templateUrl: "./profile-form-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormViewComponent implements OnInit {
  @Input() user: User;
  @Output() formSubmitted = new EventEmitter();

  profileForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initalizeForm();
  }

  initalizeForm() {
    this.profileForm = this._formBuilder.group({
      userName: [
        { value: this.user?.userName, disabled: true },
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      firstName: [
        { value: this.user?.firstName, disabled: true },
        [Validators.required, Validators.maxLength(100)],
      ],
      lastName: [
        { value: this.user?.lastName, disabled: true },
        [Validators.required, Validators.maxLength(100)],
      ],
      phoneNumber: [
        this.user?.phoneNumber,
        [Validators.minLength(4), Validators.maxLength(14)],
      ],
      email: [
        this.user?.email,
        [Validators.email],
      ],
    });
  }

  onSubmit() {
    const { value, valid } = this.profileForm;
    if (valid) this.formSubmitted.emit(this.profileForm.getRawValue());    
  }

  get userName() {
    return this.profileForm.get("userName");
  }

  get firstName() {
    return this.profileForm.get("firstName");
  }

  get lastName() {
    return this.profileForm.get("lastName");
  }

  get phoneNumber() {
    return this.profileForm.get("phoneNumber");
  }
  
  get email() {
    return this.profileForm.get("email");
  }
}
