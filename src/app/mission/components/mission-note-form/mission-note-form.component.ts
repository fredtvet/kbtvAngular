import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MissionNote } from 'src/app/shared/interfaces/models';
import { NotificationService, MissionNoteService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-note-form',
  templateUrl: './mission-note-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteFormComponent {

  @Input() noteIdPreset: number;
  @Input() missionId: number;

  @Output() finished = new EventEmitter();

  private isCreateForm: boolean = false;

  note$: Observable<MissionNote>;

  constructor(
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService)  {}

  ngOnInit(){
    if(!this.noteIdPreset) this.isCreateForm = true; 
    else this.note$ = this.missionNoteService.get$(this.noteIdPreset);
  }

  onSubmit(result: MissionNote){
    if(!result) this.finished.emit();
    else if(!this.isCreateForm) this.editNote(result);
    else this.createNote(result);
  }

  private createNote(note: MissionNote){
    if(note)
      this.missionNoteService.add$(note).subscribe(n => {
        this.notificationService.setNotification('Vellykket! Notat opprettet.');
        this.finished.emit(n);
      });  
  }

  private editNote(note: MissionNote){
    if(note)
      this.missionNoteService.update$(note).subscribe(n =>{
          this.notificationService.setNotification('Vellykket oppdatering!');
          this.finished.emit(n);
        });
  }

}
