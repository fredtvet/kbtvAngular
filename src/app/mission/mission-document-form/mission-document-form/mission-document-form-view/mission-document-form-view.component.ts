import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppDocumentType } from 'src/app/core/models';

@Component({
  selector: 'app-mission-document-form-view',
  templateUrl: './mission-document-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDocumentFormViewComponent {
  @Input() types: AppDocumentType[] = [];

  @Output() formSubmitted = new EventEmitter();
  
  documentForm: FormGroup;

  files: FileList;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.documentForm = this._formBuilder.group({
      documentType: this._formBuilder.group({
        id: [],
        name: [null, [
          Validators.required,
          Validators.maxLength(45)
        ]]
      }),
    });
  }

  onSubmit(){  
    let existingDocumentType =
        this.types.find(x => x.name === this.documentTypeName.value);

    if(existingDocumentType)
      this.documentTypeId.setValue(existingDocumentType.id);

    const value = { files: this.files, documentType: this.documentType.value };

    if(this.documentForm.dirty && this.files != null && this.files.length > 0)
      this.formSubmitted.emit(value);
  }

  changeFile(e){
    this.files = e.target.files;
  }

  get documentType(){
    return this.documentForm.get('documentType')
  }

  get documentTypeId(){
    return this.documentForm.get(['documentType','id'])
  }

  get documentTypeName(){
    return this.documentForm.get(['documentType','name'])
  }
}
