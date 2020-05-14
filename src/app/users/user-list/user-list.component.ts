import { Component } from '@angular/core';
import { UserService, MainNavService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { Observable } from 'rxjs';;
import { map } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material';
import { UserFormSheetWrapperComponent } from '../components/user-form/user-form-sheet-wrapper.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  Roles = Roles;

  users: User[];

  users$: Observable<User[]> = this.userService.getAll$().pipe(map(this.sortByRole));

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
      }
      return groups;
    }, {"Leder":[], "Mellomleder":[], "Ansatt":[]});
  
    return [...grouped[Roles.Leder], ...grouped[Roles.Mellomleder], ...grouped[Roles.Ansatt]];
  }

}
