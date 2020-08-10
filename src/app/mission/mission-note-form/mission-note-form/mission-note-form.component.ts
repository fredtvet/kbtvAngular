import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MissionNote } from 'src/app/core/models';
import { NotificationService, MissionNoteService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { Notifications } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-mission-note-form',
  templateUrl: './mission-note-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteFormComponent {

  @Input() idPreset: number;
  @Input() missionId: number;

  @Output() finished = new EventEmitter();

  private isCreateForm: boolean = false;

  note$: Observable<MissionNote>;

  constructor(
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService)  {}

  ngOnInit(){
    if(!this.idPreset) this.isCreateForm = true; 
    else this.note$ = this.missionNoteService.get$(this.idPreset);
  }

  onSubmit(result: MissionNote){
    if(!result) this.finished.emit();
    else if(!this.isCreateForm) this.editNote(result);
    else this.createNote(result);
  }

  private createNote(note: MissionNote){
    if(note)
      this.missionNoteService.add$(note).subscribe(n => {
        this.notificationService.notify({
          title:'Vellykket! Notat opprettet.',        
          type: Notifications.Success
        })
        this.finished.emit(n);
      });  
  }

  private editNote(note: MissionNote){
    if(note)
      this.missionNoteService.update$(note).subscribe(n =>{
        this.notificationService.notify({
          title:'Vellykket oppdatering!',        
          type: Notifications.Success
        })
        this.finished.emit(n);
      });
  }

}
