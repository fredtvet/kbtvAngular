import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InboundEmailPassword } from 'src/app/core/models';
import { BaseModelFormViewComponent } from 'src/app/core/services/model/form/abstracts/base-model-form-view.component';
import { ModelFormViewConfig } from 'src/app/core/services/model/form/interfaces';
import { SaveModelStateCommand } from 'src/app/core/services/model/interfaces';

type ViewConfig = ModelFormViewConfig<InboundEmailPassword, InboundEmailPassword>;
type Response = SaveModelStateCommand<InboundEmailPassword>;

@Component({
  selector: 'app-inbound-email-password-form-view',
  templateUrl: './inbound-email-password-form-view.component.html'
})
export class InboundEmailPasswordFormViewComponent 
  extends BaseModelFormViewComponent<InboundEmailPassword, InboundEmailPassword, ViewConfig, Response> {

  constructor(private _formBuilder: FormBuilder) { super(); }

  protected _initalizeForm(cfg: ViewConfig){
    return this._formBuilder.group({
      password: [null, [
        Validators.required,
        Validators.maxLength(250)
      ]],
    });
  }

  get password(){
    return this.form.get('password')
  }
}
