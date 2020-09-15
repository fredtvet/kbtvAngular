import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormComponent } from 'src/app/core/form/form-component.interface';
import { StateAction, SaveAction } from 'src/app/core/state';
import { MissionDocumentListStore } from './mission-document-list.store';

@Component({
  selector: 'app-mail-image-form',
  template: `
    <app-mail-to-form-view [toEmailPreset]="config.toEmailPreset" (formSubmitted)="mailDocuments($event)"></app-mail-to-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailDocumentFormComponent implements FormComponent{
 
  @Input() config: {toEmailPreset: string, ids: string[]};
  @Output() formSubmitted =  new EventEmitter<SaveAction>();

  constructor(private store: MissionDocumentListStore) {}

  mailDocuments = (toEmail: string) =>{
    this.store.mailDocuments(toEmail, this.config.ids);
    this.formSubmitted.emit(StateAction.Create);
  }
  
}