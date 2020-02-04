import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MissionNote, ROLES } from 'src/app/shared';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
@Component({
  selector: 'app-mission-note-form',
  templateUrl: './mission-note-form.component.html',
  styleUrls: ['./mission-note-form.component.css']
})

export class MissionNoteFormComponent {
  ROLES = ROLES;

  headerTitle: string;
  icon: string;

  noteForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MissionNoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)  { }

  ngOnInit(){
    this.configure();
    this.initalizeForm();
  }

  initalizeForm(){
    this.noteForm = this._formBuilder.group({
      id: +this.data.note.id,
      title: [this.data.note.title, [
        Validators.maxLength(40)
      ]],
      content: [this.data.note.content, [
        Validators.required,
        Validators.maxLength(400)
      ]],
      pinned: this.data.note.pinned,
      missionId: +this.data.missionId
    });
  }

  onSubmit(){
    const {value, valid} = this.noteForm;
    if(valid){
        this.dialogRef.close(value);
    }
  }

  configure(){
    if(!this.data.note){
      this.headerTitle = "Nytt notat";
      this.icon = "add";
      this.data.note = new MissionNote();
    }else{
      this.headerTitle = "Rediger notat";
      this.icon = "edit";
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  get title(){
    return this.noteForm.get('title')
  }

  get content(){
    return this.noteForm.get('content');
  }

  get pinned(){
    return this.noteForm.get('pinned')
  }

}
