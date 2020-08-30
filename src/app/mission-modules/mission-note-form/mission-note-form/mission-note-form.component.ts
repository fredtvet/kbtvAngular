import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MissionNote } from 'src/app/core/models';
import { MissionNoteFormStore } from '../mission-note-form.store';
import { MissionChildFormConfig } from 'src/app/shared/interfaces';
import { FormAction } from 'src/app/shared/enums';
import { NotificationService, NotificationType } from 'src/app/core/services/notification';

@Component({
  selector: 'app-mission-note-form',
  template: `
  <app-mission-note-form-view
    [note]="note$ | async"
    [missionId]="config?.missionId"
    (formSubmitted)="onSubmit($event)">
  </app-mission-note-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteFormComponent {

  @Input() config: MissionChildFormConfig;

  @Output() finished = new EventEmitter();

  private isCreateForm: boolean = false;

  note$: Observable<MissionNote>;

  constructor(
    private store: MissionNoteFormStore,
    private notificationService: NotificationService)  {}

  ngOnInit(){
    if(!this.config?.entityId) this.isCreateForm = true; 
    else this.note$ = this.store.getNoteById$(this.config.entityId);
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
          type: NotificationType.Success
        })
        this.finished.emit(FormAction.Create);
      });  
  }

  private editNote(note: MissionNote){
    if(note)
      this.store.update$(note).subscribe(n =>{
        this.notificationService.notify({
          title:'Vellykket oppdatering!',        
          type: NotificationType.Success
        })
        this.finished.emit(FormAction.Update);
      });
  }

}
