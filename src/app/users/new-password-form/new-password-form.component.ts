import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from 'src/app/core/services';
import { Notifications } from 'src/app/shared-app/enums';
import { UsersStore } from '../users.store';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewPasswordFormComponent {
 
  @Input() userName: string;
  @Output() finished = new EventEmitter();

  constructor(
    private store: UsersStore,
    private notificationService: NotificationService) {}

  onSubmit(result:any): void{
    if(!result || result == null) this.finished.emit();
    
    this.store.updatePassord$(this.userName, result.newPassword).subscribe(x => {
      this.notificationService.notify({
        title:'Vellykket oppdatering!',        
        type: Notifications.Success
      })
      this.finished.emit();
    })
  }
}
