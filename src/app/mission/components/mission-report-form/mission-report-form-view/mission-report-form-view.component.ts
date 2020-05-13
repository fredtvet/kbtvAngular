import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionReportType } from 'src/app/shared/models';

@Component({
  selector: 'app-mission-report-form-view',
  templateUrl: './mission-report-form-view.component.html'
})

export class MissionReportFormViewComponent {
  @Input() types: MissionReportType[] = [];

  @Output() formSubmitted = new EventEmitter();
  
  reportForm: FormGroup;

  files: FileList;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.reportForm = this._formBuilder.group({
      reportType: this._formBuilder.group({
        id: [],
        name: [null, [
          Validators.required,
          Validators.maxLength(45)
        ]]
      }),
    });
  }

  onSubmit(){  
    let existingReportType =
        this.types.find(x => x.name === this.reportTypeName.value);

    if(existingReportType)
      this.reportTypeId.setValue(existingReportType.id);

    const value = { files: this.files, reportType: this.reportType.value };

    if(this.reportForm.dirty && this.files != null && this.files.length > 0)
      this.formSubmitted.emit(value);
  }

  changeFile(e){
    this.files = e.target.files;
  }

  get reportType(){
    return this.reportForm.get('reportType')
  }

  get reportTypeId(){
    return this.reportForm.get(['reportType','id'])
  }

  get reportTypeName(){
    return this.reportForm.get(['reportType','name'])
  }
}
