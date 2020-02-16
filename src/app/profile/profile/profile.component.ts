import { Component, OnInit } from '@angular/core';
import { IdentityService, NotificationService } from 'src/app/core';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private identityService: IdentityService,
    private notificationService: NotificationService,
  ){ }

  public user: User;
  public passwordStatus: string;

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
      () => this.passwordStatus = ""
    );
  }

  confirmPurge(){
    if(confirm('All data vil bli lastet inn på nytt neste gang du logger inn. Vær oppmerksom på at dette kan kreve mye mobildata om du ikke har Wi-Fi aktivert!')){
      window.localStorage.clear();
      location.reload();
    }
  }

}
