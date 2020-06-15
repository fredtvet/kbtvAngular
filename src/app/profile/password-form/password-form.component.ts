import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PasswordFormComponent {
 
  @Output() finished = new EventEmitter();

  serverError: string;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService) {}

  onSubmit(result:any): void{
    if(!result || result == null) this.finished.emit();

    this.authService.changePassword$(result.oldPassword, result.password).subscribe(
      res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.finished.emit();
      }, 
      error => this.serverError = error
    )
  }
}
