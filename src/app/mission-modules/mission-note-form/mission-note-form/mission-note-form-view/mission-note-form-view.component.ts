import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MissionNote } from 'src/app/core/models';
import { Roles } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-mission-note-form-view',
  templateUrl: './mission-note-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    if(!this.note || this.note == null) this.isCreateForm = true;

    this.initalizeForm(this.note);
  }

  initalizeForm(note: MissionNote){
    this.noteForm = this._formBuilder.group({
      id: note?.id,
      title: [note?.title, [
        Validators.maxLength(40)
      ]],
      content: [note?.content, [
        Validators.required,
        Validators.maxLength(400)
      ]],
      pinned: note?.pinned,
      missionId: this.missionId
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
