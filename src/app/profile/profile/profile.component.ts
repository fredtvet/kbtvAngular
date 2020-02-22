import { Component, OnInit, Input } from '@angular/core';
import { IdentityService, NotificationService, LoadingService } from 'src/app/core';
import { User } from 'src/app/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User;
  passwordStatus: string;
  loading$: Observable<boolean>;

  constructor(
    private identityService: IdentityService,
    private notificationService: NotificationService,
  ){ }


  ngOnInit() {
    this.identityService.currentUser$
      .subscribe(user => this.user = user);
  }

  updateProfile(updatedUser){
    updatedUser.userName = this.user.userName;

    this.identityService.updateCurrentUser(updatedUser)
      .subscribe(data => this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  updatePassword(data: any){
    this.identityService.changePassword(data.oldPassword, data.password).subscribe(
      data => this.notificationService.setNotification('Passord oppdatert!'),
      error => this.passwordStatus = "Nåværende passord stemmer ikke",
      () => this.passwordStatus = ""
    );
  }

  confirmPurge(){
    if(confirm('All data blir lastet inn på nytt neste gang du logger inn. Vær oppmerksom på at dette kan kreve mye mobildata om du ikke har Wi-Fi aktivert!')){
      window.localStorage.clear();
      location.reload();
    }
  }

}
