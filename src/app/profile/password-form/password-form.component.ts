import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ProfileStore } from '../profile.store';
import { FormAction } from 'src/app/shared/enums';
import { NotificationService, NotificationType } from 'src/app/core/services/notification';

@Component({
  selector: 'app-password-form',
  template: `
  <app-password-form-view
    (formSubmitted)="onSubmit($event)">
  </app-password-form-view>
  `,
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
          type: NotificationType.Success
        })
        this.finished.emit(FormAction.Update);
      }
    )
  }
}
