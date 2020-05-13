import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MissionNote } from 'src/app/shared/models';
import { Roles } from 'src/app/shared/enums';

@Component({
  selector: 'app-mission-note-form-view',
  templateUrl: './mission-note-form-view.component.html'
})

export class MissionNoteFormViewComponent {
  Roles = Roles;

  @Input() note: MissionNote = null;
  @Input() missionId: number = null;
  
  @Output() formSubmitted = new EventEmitter();

  noteForm: FormGroup;
  isCreateForm: boolean = false;

  constructor(private _formBuilder: FormBuilder)  { }

  ngOnInit(){
    if(this.note == null){
      this.note = new MissionNote();
      this.isCreateForm = true;
      this.note.missionId = this.missionId;
    }

    this.initalizeForm();
  }

  initalizeForm(){
    this.noteForm = this._formBuilder.group({
      id: this.note.id,
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
    if(valid && this.noteForm.dirty) this.formSubmitted.emit(value);
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
