import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MissionNote, ROLES } from 'src/app/shared';

@Component({
  selector: 'app-mission-note-form-view',
  templateUrl: './mission-note-form-view.component.html'
})

export class MissionNoteFormViewComponent {
  ROLES = ROLES;

  @Input() note: MissionNote = null;
  @Input() missionId: number = null;
  @Output() formSubmitted = new EventEmitter();

  noteForm: FormGroup;

  constructor(private _formBuilder: FormBuilder)  { }

  ngOnInit(){

    if(this.note == null){
      this.note = new MissionNote();
      this.note.missionId = this.missionId;
    }

    this.initalizeForm();
  }

  initalizeForm(){
    this.noteForm = this._formBuilder.group({
      id: +this.note.id,
      title: [this.note.title, [
        Validators.maxLength(40)
      ]],
      content: [this.note.content, [
        Validators.required,
        Validators.maxLength(400)
      ]],
      pinned: this.note.pinned,
      missionId: this.note.missionId
    });
  }

  onSubmit(){
    const {value, valid} = this.noteForm;
    if(valid) this.formSubmitted.emit(value);
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
