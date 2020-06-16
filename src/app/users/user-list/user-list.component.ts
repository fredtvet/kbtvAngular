import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService, MainNavService } from 'src/app/core/services';
import { User } from 'src/app/core/models';
import { Roles } from '../../shared-app/enums';
import { Observable } from 'rxjs';;
import { map } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UserFormSheetWrapperComponent } from '../components/user-form/user-form-sheet-wrapper.component';
import { TopDefaultNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { NewPasswordFormWrapperComponent } from '../components/new-password-form/new-password-form-wrapper.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  Roles = Roles;
  users: User[];

  users$: Observable<User[]> = this.userService.getAllDetails$().pipe(map(this.sortByRole));

  constructor(
    private mainNavService: MainNavService,
    private userService: UserService,
    private _bottomSheet: MatBottomSheet) {    
      this.configureMainNav(); 
    }

  openUserForm = (userNamePreset?: string) => 
    this._bottomSheet.open(UserFormSheetWrapperComponent, {data: {userNamePreset}});

  openNewPasswordForm = (userName?: string) => 
    this._bottomSheet.open(NewPasswordFormWrapperComponent, {data: {userName}});

  private configureMainNav(){
    let cfg = {title:  "Brukere"} as TopDefaultNavConfig;

    cfg.buttons = [{
      icon: "person_add", 
      colorClass: "color-accent",
      aria: 'Ny bruker',
      callback: this.openUserForm, 
      allowedRoles: [Roles.Leder]
    }] as AppButton[]

    this.mainNavService.addTopNavConfig({default: cfg});
  }

  private sortByRole(users: User[]): User[]{
    let grouped = users.reduce((groups, user) => {
      switch(user.role){
        case Roles.Leder:
          groups[Roles.Leder].push(user);
          break;
        case Roles.Mellomleder:
          groups[Roles.Mellomleder].push(user);
          break;
        case Roles.Ansatt: 
          groups[Roles.Ansatt].push(user);
          break;
        case Roles.Oppdragsgiver: 
          groups[Roles.Oppdragsgiver].push(user);
          break;
      }
      return groups;
    }, {"Leder":[], "Mellomleder":[], "Ansatt":[], "Oppdragsgiver":[]});
  
    return [...grouped[Roles.Leder], ...grouped[Roles.Mellomleder], ...grouped[Roles.Ansatt], ...grouped[Roles.Oppdragsgiver]];
  }

}
