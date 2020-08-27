import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDocumentType } from 'src/app/core/models';
import { MissionDocumentFormStore } from '../mission-document-form.store';
import { FormAction } from 'src/app/shared/enums';
import { MissionChildFormConfig } from 'src/app/shared/interfaces';

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
  @Input() config: MissionChildFormConfig;
  @Output() finished = new EventEmitter();

  documentTypes$: Observable<AppDocumentType[]> = this.store.documentTypes$;

  constructor(private store: MissionDocumentFormStore) {}

  onSubmit(data:any){  
    if(!data || !this.config?.missionId) this.finished.emit();
    else 
      this.store
        .add$({missionId: this.config.missionId, documentType: data.documentType, files: data.files})
        .subscribe(x => this.finished.emit(FormAction.Create)) 
  }

}
