import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseModelFormViewComponent, ModelFormViewConfig } from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { MissionType } from 'src/app/core/models';

type ViewConfig = ModelFormViewConfig<MissionType, MissionType>;
type Response = SaveModelStateCommand<MissionType>;

@Component({
  selector: 'app-mission-type-form-view',
  templateUrl: './mission-type-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionTypeFormViewComponent extends BaseModelFormViewComponent<MissionType, MissionType, ViewConfig, Response> { 

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
