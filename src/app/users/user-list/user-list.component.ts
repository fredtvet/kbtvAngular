import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService, MainNavService, ArrayHelperService } from 'src/app/core/services';
import { User } from 'src/app/core/models';
import { Roles, ButtonTypes } from '../../shared-app/enums';
import { Observable } from 'rxjs';;
import { map, tap } from 'rxjs/operators';
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
  ButtonTypes = ButtonTypes;

  users$: Observable<User[]>;

  constructor(
    private mainNavService: MainNavService,
    private userService: UserService,
    private bottomSheet: MatBottomSheet,
    private arrayHelperService: ArrayHelperService) {}

  ngOnInit(): void {
    this.configureMainNav(); 
    this.users$ = this.userService.getAllDetails$().pipe(map(this.sortByRole));
  }

  openUserForm = (userNamePreset?: string) => 
    this.bottomSheet.open(UserFormSheetWrapperComponent, {data: {userNamePreset}});

  openNewPasswordForm = (userName?: string) => 
    this.bottomSheet.open(NewPasswordFormWrapperComponent, {data: {userName}});

  private configureMainNav(){
    let cfg = {title:  "Brukere"} as TopDefaultNavConfig;

    cfg.buttons = [{
      icon: "person_add", 
      colorClass: "color-accent",
      aria: 'Ny bruker',
      callback: this.openUserForm, 
      allowedRoles: [Roles.Leder]
    }] as AppButton[]

    this.mainNavService.addConfig({default: cfg});
  }

  private sortByRole = (users: User[]): User[] => {
    let grouped = this.arrayHelperService.groupBy(users, "role");  
    return [...grouped[Roles.Leder], ...grouped[Roles.Mellomleder], ...grouped[Roles.Ansatt], ...grouped[Roles.Oppdragsgiver]];
  }

}
