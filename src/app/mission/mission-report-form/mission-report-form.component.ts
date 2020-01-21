import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionReportsService } from 'src/app/core';
import { ROLES } from 'src/app/shared';
@Component({
  selector: 'app-mission-report-form',
  templateUrl: './mission-report-form.component.html',
  styleUrls: ['./mission-report-form.component.css']
})
export class MissionReportFormComponent implements OnInit {
  public ROLES = ROLES;
  constructor(
    public dialogRef: MatDialogRef<MissionReportFormComponent>,
    private _formBuilder: FormBuilder,
    private _missionReportsService: MissionReportsService) { }

  reportForm: FormGroup;

  public files: FileList;

  public reportTypes: any;

  ngOnInit() {
    this._missionReportsService.getTypes().subscribe(result => {
      this.reportTypes = result
    });

    this.reportForm = this._formBuilder.group({
      typeId: ["", [
        Validators.required
      ]]
    });
  }

  onSubmit(){
    const value = { files: this.files, typeId: this.typeId.value };
    this.dialogRef.close(value);
  }

  changeType(e){
    this.typeId.setValue(
      e.target.value,
      {onlySelf: true}
    );
  }

  changeFile(e){
    this.files = e.target.files;
  }

  get typeId(){
    return this.reportForm.get('typeId')
  }

}
