import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormComponent } from 'src/app/core/services/form/interfaces';
import { SaveAction } from 'src/app/core/services/state/interfaces';
import { ProfileStore } from '../profile.store';

@Component({
  selector: 'app-password-form',
  template: `
  <app-password-form-view
    (formSubmitted)="onSubmit($event)">
  </app-password-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PasswordFormComponent implements FormComponent {
 
  config: any;
  @Output() formSubmitted = new EventEmitter<SaveAction>();

  constructor(private store: ProfileStore) {}

  onSubmit(result:any): void{
    if(!result || result == null) this.formSubmitted.emit();

    this.store.updatePassword(result.oldPassword, result.password);
  }
}
