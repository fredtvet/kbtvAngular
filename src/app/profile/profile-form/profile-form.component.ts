import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { FormComponent } from 'src/app/core/services/form/interfaces';
import { SaveAction } from 'src/app/core/services/state/interfaces';
import { StateAction } from 'src/app/core/services/state/state-action.enum';
import { ProfileStore } from '../profile.store';

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
