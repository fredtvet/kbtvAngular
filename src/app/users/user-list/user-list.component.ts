import { Component } from '@angular/core';
import { UserService, IdentityService, MainNavService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { AppButton } from 'src/app/shared/interfaces';
import { MatBottomSheet } from '@angular/material';
import { UserFormSheetWrapperComponent } from '../components/user-form/user-form-sheet-wrapper.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  Roles = Roles;

  users: User[];

  users$: Observable<User[]> = this.userService.getAll$().pipe(map(users => {
    let grouped = users.reduce((groups, user) => {
      if (!groups[user.role]) groups[user.role] = [];      
      groups[user.role].push(user);
      return groups;
    }, []);
    return [...grouped[Roles.Leder], ...grouped[Roles.Mellomleder], ...grouped[Roles.Ansatt]];
  }));

  constructor(
    private mainNavService: MainNavService,
    private userService: UserService,
    private _bottomSheet: MatBottomSheet) {    
      this.configureMainNav(); 
    }

  openUserForm = (userNamePreset?: string) => 
    this._bottomSheet.open(UserFormSheetWrapperComponent, {data: {userNamePreset}});

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Brukere";
    cfg.buttons = [{
      icon: "person_add", 
      colorClass: "color-accent",
      aria: 'Ny bruker',
      callback: this.openUserForm, 
      allowedRoles: [Roles.Leder]
    }]
    this.mainNavService.addConfig(cfg);
  }

}
