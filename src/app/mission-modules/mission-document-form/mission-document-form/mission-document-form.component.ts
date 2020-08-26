import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDocumentType } from 'src/app/core/models';
import { MissionDocumentFormStore } from '../mission-document-form.store';

@Component({
  selector: 'app-mission-document-form',
  template: `
  <app-mission-document-form-view
    [types]="documentTypes$ | async"
    (formSubmitted)="onSubmit($event)">
  </app-mission-document-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDocumentFormComponent{
  @Input() missionId: number;
  @Output() finished = new EventEmitter();

  documentTypes$: Observable<AppDocumentType[]> = this.store.documentTypes$;

  constructor(private store: MissionDocumentFormStore) {}

  onSubmit(data:any){  
    if(!data || !this.missionId) this.finished.emit();
    else 
      this.store
        .add$({missionId: this.missionId, documentType: data.documentType, files: data.files})
        .subscribe(x => this.finished.emit(x)) 
  }

}
