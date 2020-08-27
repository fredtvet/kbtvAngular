import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { InboundEmailPassword } from 'src/app/core/models';
import { DataManagementStore } from '../../data-management.store';
import { FormAction } from 'src/app/shared/enums';

@Component({
  selector: 'app-inbound-email-password-form',  
  template: `
  <app-inbound-email-password-form-view
    (formSubmitted)="onSubmit($event)">
  </app-inbound-email-password-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboundEmailPasswordFormComponent {

  @Output() finished = new EventEmitter();

  constructor(private store: DataManagementStore) { }

  onSubmit = (password: InboundEmailPassword) => {
    if(!password) this.finished.emit();
    else this.store.add$(password).subscribe(x => this.finished.emit(FormAction.Create));
  }

}
