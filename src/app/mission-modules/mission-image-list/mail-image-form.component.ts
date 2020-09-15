import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormComponent } from 'src/app/core/form/form-component.interface';
import { StateAction, SaveAction } from 'src/app/core/state';
import { MissionImageListStore } from './mission-image-list.store';

@Component({
  selector: 'app-mail-image-form',
  template: `
    <app-mail-to-form-view [toEmailPreset]="config.toEmailPreset" (formSubmitted)="mailImages($event)"></app-mail-to-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class MailImageFormComponent implements FormComponent{
 
  @Input() config: {toEmailPreset: string, ids: string[]};
  @Output() formSubmitted =  new EventEmitter<SaveAction>();

  constructor(private store: MissionImageListStore) {}

  mailImages = (toEmail: string) =>{
    this.store.mailImages(toEmail, this.config.ids);    
    this.formSubmitted.emit(StateAction.Create);
  }
  
}