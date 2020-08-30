import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SyncStoreConfig } from 'src/app/core/services/sync';

@Component({
  selector: "app-app-config-form",
  templateUrl: "./app-config-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppConfigFormComponent implements OnChanges {
  @Input() syncConfig: SyncStoreConfig;
  @Output() formSubmitted = new EventEmitter();

  settingsForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnChanges() { this.initalizeForm(); }

  initalizeForm() {
    this.settingsForm = this._formBuilder.group({
      refreshTime: [
        this.syncConfig?.refreshTime / 60,
        [Validators.required, Validators.min(1)],
      ],
      initialNumberOfMonths: [
        this.syncConfig?.initialNumberOfMonths,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  onSubmit() {
    const { value, valid } = this.settingsForm;
    if (valid) this.formSubmitted.emit(value);    
  }

  get refreshTime() {
    return this.settingsForm.get("refreshTime");
  }

  get initialNumberOfMonths() {
    return this.settingsForm.get("initialNumberOfMonths");
  }
}
