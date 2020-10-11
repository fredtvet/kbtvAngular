import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MissionType } from 'src/app/core/models';
import { BaseModelFormViewComponent } from 'src/app/core/services/model/form/abstracts/base-model-form-view.component';
import { ModelFormViewConfig } from 'src/app/core/services/model/form/interfaces';

type ViewConfig = ModelFormViewConfig<MissionType, MissionType>;

@Component({
  selector: 'app-mission-type-form-view',
  templateUrl: './mission-type-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionTypeFormViewComponent extends BaseModelFormViewComponent<MissionType, MissionType, ViewConfig> { 

  constructor(private _formBuilder: FormBuilder) { super(); }

  protected _initalizeForm(cfg: ViewConfig){
    return this._formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(45)
      ]],
    });
  }

  get name(){
    return this.form.get('name')
  }

}
