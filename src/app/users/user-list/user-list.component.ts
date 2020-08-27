import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { MainNavService } from 'src/app/core/services';
import { AppButton, TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { ButtonTypes, Roles } from '../../shared-app/enums';
import { UserFormSheetWrapperComponent } from '../user-form/user-form-sheet-wrapper.component';
import { UsersStore } from '../users.store';
import { NewPasswordFormSheetWrapperComponent } from '../new-password-form/new-password-form-sheet-wrapper.component';
;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  Roles = Roles;
  ButtonTypes = ButtonTypes;

  users$: Observable<User[]> = this.store.sortedUsers$;

  constructor(
    private mainNavService: MainNavService,
    private store: UsersStore,
    private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.configureMainNav(); 
  }

  openUserForm = (userName?: string) => 
    this.bottomSheet.open(UserFormSheetWrapperComponent, {data: {entityId: userName}});

  openNewPasswordForm = (userName?: string) => 
    this.bottomSheet.open(NewPasswordFormSheetWrapperComponent, {data: {entityId: userName}});

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

}
