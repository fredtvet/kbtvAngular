import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { NotificationService, UserService } from 'src/app/core/services';
import { Notifications } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewPasswordFormComponent {
 
  @Input() userName: string;
  @Output() finished = new EventEmitter();

  serverError: string;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService) {}

  onSubmit(result:any): void{
    if(!result || result == null) this.finished.emit();
    
    this.userService.newPassword$(this.userName, result.newPassword).subscribe(
      res => {
        this.notificationService.notify({
          title:'Vellykket oppdatering!',        
          type: Notifications.Success
        })
        this.finished.emit();
      }, 
      error => this.serverError = error
    )
  }
}
