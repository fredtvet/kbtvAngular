import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MissionNote } from 'src/app/shared/interfaces/models';
import { Roles } from 'src/app/shared/enums';

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

  initalizeForm(x: MissionNote){
    this.noteForm = this._formBuilder.group({
      id: x ? x.id : null,
      title: [x ? x.title : null, [
        Validators.maxLength(40)
      ]],
      content: [x ? x.content : null, [
        Validators.required,
        Validators.maxLength(400)
      ]],
      pinned: x ? x.pinned : null,
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
