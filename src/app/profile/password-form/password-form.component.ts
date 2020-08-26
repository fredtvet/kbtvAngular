import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NotificationService } from 'src/app/core/services';
import { Notifications } from 'src/app/shared-app/enums';
import { ProfileStore } from '../profile.store';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PasswordFormComponent {
 
  @Output() finished = new EventEmitter();

  constructor(
    private store: ProfileStore,
    private notificationService: NotificationService) {}

  onSubmit(result:any): void{
    if(!result || result == null) this.finished.emit();

    this.store.updatePassword$(result.oldPassword, result.password).subscribe(x => {
        this.notificationService.notify({
          title:'Vellykket oppdatering!',        
          type: Notifications.Success
        })
        this.finished.emit();
      }
    )
  }
}
