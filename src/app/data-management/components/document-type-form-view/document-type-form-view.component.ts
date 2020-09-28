import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseModelFormViewComponent, ModelFormViewConfig } from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { AppDocumentType } from 'src/app/core/models';

type ViewConfig = ModelFormViewConfig<AppDocumentType, AppDocumentType>;
type Response = SaveModelStateCommand<AppDocumentType>;

@Component({
  selector: 'app-document-type-form-view',
  templateUrl: './document-type-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypeFormViewComponent extends BaseModelFormViewComponent<AppDocumentType, AppDocumentType, ViewConfig, Response> {

  constructor(private _formBuilder: FormBuilder) { super(); }

  protected _initalizeForm(cfg: ViewConfig): FormGroup {
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
