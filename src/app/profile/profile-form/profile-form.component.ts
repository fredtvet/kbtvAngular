import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { ProfileStore } from '../profile.store';
import { StateAction, SaveAction } from 'src/app/core/state';
import { FormComponent } from 'src/app/core/form/form-component.interface';

@Component({
  selector: 'app-profile-form',
  template: `
  <app-profile-form-view
    [user]="user$ | async"
    (formSubmitted)="onSubmit($event)">
  </app-profile-form-view>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent implements FormComponent{
 
  config: any;
  @Output() formSubmitted = new EventEmitter<SaveAction>();

  user$: Observable<User> = this.store.currentUser$;

  constructor(private store: ProfileStore) {}

  onSubmit(user: User): void{
    if(!user || user == null) this.formSubmitted.emit();
    this.formSubmitted.emit(StateAction.Update);
    this.store.updateCurrentUser(user);
  }
}
