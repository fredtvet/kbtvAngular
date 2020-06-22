import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SyncConfig } from 'src/app/core/services';

@Component({
  selector: "app-app-config-form",
  templateUrl: "./app-config-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppConfigFormComponent implements OnInit {
  @Input() syncConfig: SyncConfig;
  @Output() formSubmitted = new EventEmitter();

  settingsForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initalizeForm();
  }

  initalizeForm() {
    this.settingsForm = this._formBuilder.group({
      syncRefreshTime: [
        this.syncConfig.syncRefreshTime / 60,
        [Validators.required, Validators.min(1)],
      ],
      initialNumberOfMonths: [
        this.syncConfig.initialNumberOfMonths,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  onSubmit() {
    const { value, valid } = this.settingsForm;
    if (valid) this.formSubmitted.emit(value);    
  }

  get syncRefreshTime() {
    return this.settingsForm.get("syncRefreshTime");
  }

  get initialNumberOfMonths() {
    return this.settingsForm.get("initialNumberOfMonths");
  }
}
