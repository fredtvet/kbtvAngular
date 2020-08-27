import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { NotificationService } from 'src/app/core/services';
import { Notifications } from 'src/app/shared-app/enums';
import { ProfileStore } from '../profile.store';
import { FormAction } from 'src/app/shared/enums';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFormComponent {
 
  @Output() finished = new EventEmitter();

  user$: Observable<User> = this.store.currentUser$;

  constructor(
    private store: ProfileStore,
    private notificationService: NotificationService) {}

  onSubmit(user: User): void{
    if(!user || user == null) this.finished.emit();

    this.store.updateCurrentUser$(user).subscribe(x => {
      this.notificationService.notify({
        title:'Vellykket oppdatering!',        
        type: Notifications.Success
      })
      this.finished.emit(FormAction.Update);
    })
  }
}
