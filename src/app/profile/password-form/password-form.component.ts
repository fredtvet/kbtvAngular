import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ProfileStore } from '../profile.store';
import { SaveAction } from 'src/app/core/state';
import { FormComponent } from 'src/app/core/form/form-component.interface';

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
