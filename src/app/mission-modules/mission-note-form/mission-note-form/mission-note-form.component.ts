import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MissionNote } from 'src/app/core/models';
import { NotificationService } from 'src/app/core/services';
import { Notifications } from 'src/app/shared-app/enums';
import { MissionNoteFormStore } from '../mission-note-form.store';

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
    private store: MissionNoteFormStore,
    private notificationService: NotificationService)  {}

  ngOnInit(){
    if(!this.idPreset) this.isCreateForm = true; 
    else this.note$ = this.store.getNoteById$(this.idPreset);
  }

  onSubmit(result: MissionNote){
    if(!result) this.finished.emit();
    else if(!this.isCreateForm) this.editNote(result);
    else this.createNote(result);
  }

  private createNote(note: MissionNote){
    if(note)
      this.store.add$(note).subscribe(n => {
        this.notificationService.notify({
          title:'Vellykket! Notat opprettet.',        
          type: Notifications.Success
        })
        this.finished.emit();
      });  
  }

  private editNote(note: MissionNote){
    if(note)
      this.store.update$(note).subscribe(n =>{
        this.notificationService.notify({
          title:'Vellykket oppdatering!',        
          type: Notifications.Success
        })
        this.finished.emit();
      });
  }

}
