import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService, AuthService } from 'src/app/core/services';
import { User } from 'src/app/core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFormComponent {
 
  @Output() finished = new EventEmitter();

  user$: Observable<User> = this.authService.currentUser$;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService) {}

  onSubmit(user:User): void{
    console.log(user);
    if(!user || user == null) this.finished.emit();

    this.authService.updateCurrentUser$(user).subscribe(
      res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.finished.emit();
      },
    )
  }
}
