import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IdentityService } from 'src/app/core';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private identityService: IdentityService,
    private _snackBar: MatSnackBar
  ){ }

  public user: User;
  public passwordStatus: string;

  ngOnInit() {
    this.identityService.currentUser$
      .subscribe(user => this.user = user);
  }

  updateProfile(updatedUser){
    updatedUser.userName = this.user.userName;

    this.identityService.updateCurrentUser(updatedUser).subscribe(
      result =>{
        this.openSnackBar('Vellykket oppdatering!')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  updatePassword(data: any){
    this.identityService.changePassword(data.oldPassword, data.password).subscribe(
      result => this.openSnackBar('Passord oppdatert!'),
      error => this.passwordStatus = "Nåværende passord er feil!",
      () => this.passwordStatus = ""
    );
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'lukk', {
      duration: 2000,
      panelClass: 'snackbar_margin'
    });
  }

}
