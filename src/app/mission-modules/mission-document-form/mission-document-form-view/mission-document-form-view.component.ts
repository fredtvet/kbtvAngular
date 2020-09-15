import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseModelFormViewComponent, ModelFormViewConfig } from 'src/app/core/model/form';
import { SaveModelWithFileStateCommand } from 'src/app/core/model/interfaces';
import { AppDocumentType, MissionDocument } from 'src/app/core/models';
import { MissionDocumentFormState } from './mission-document-form-state.interface';

type ViewConfig = ModelFormViewConfig<MissionDocument, MissionDocumentFormState>;
type Response = SaveModelWithFileStateCommand<MissionDocument>;

@Component({
  selector: 'app-mission-document-form-view',
  templateUrl: './mission-document-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentFormViewComponent extends BaseModelFormViewComponent<MissionDocumentFormState, MissionDocument, ViewConfig, Response> {

  files: FileList;

  constructor(private _formBuilder: FormBuilder) { super(); }

  changeFile(e){
    this.files = e.target.files;
  }

  protected _initalizeForm(cfg: ViewConfig): FormGroup{
    return this._formBuilder.group({
      missionId: cfg.lockedValues?.missionId,
      documentType: this._formBuilder.group({
        name: [null, [
          Validators.required,
          Validators.maxLength(45)
        ]]
      }),
    });
  }

  protected _convertFormDataToResponse(): Response{
    let document = this.form.getRawValue();
    let existingType: AppDocumentType;

    if(this.config?.foreigns){
      existingType = this.config.foreigns.documentTypes?.find(x => x.name === this.documentTypeName.value);
    }

    if(existingType) document.documentTypeId = existingType.id;

    if(!document.documentType.name) document.documentTypeId = null;

    if(existingType || !document.documentType.name) document.documentType = null;

    return {entity: document, file: this.files ? this.files[0] : null};
  }

  protected _addSubmitChecks = () => this.files != null && this.files.length > 0


  get documentType(){
    return this.form.get('documentType')
  }

  get documentTypeName(){
    return this.form.get(['documentType','name'])
  }
}
