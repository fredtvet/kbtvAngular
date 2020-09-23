import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { FormService } from 'src/app/core/services/form/form.service';
import { ModelFormService } from 'src/app/core/services/model';
import { MainNavService } from 'src/app/layout';
import { ButtonTypes, Roles } from 'src/app/shared-app/enums';
import { MainTopNavComponent } from 'src/app/shared/components/main-top-nav/main-top-nav.component';
import { NewPasswordFormComponent } from '../new-password-form/new-password-form.component';
import { UserFormViewConfig } from '../user-form-view/user-form-view-config.interface';
import { UserFormViewComponent } from '../user-form-view/user-form-view.component';
import { UsersStore } from '../users.store';

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
    private modelFormService: ModelFormService,
    private formService: FormService) {}

  ngOnInit(): void {
    this.configureMainNav();
  }

  openUserForm = (userName?: string) => 
    this.modelFormService.open({formConfig: {
        entityId: userName, 
        stateProp: "users", 
        viewComponent: UserFormViewComponent,
        viewConfig: {users: this.store.users} as UserFormViewConfig
      }});

  openNewPasswordForm = (userName?: string) => 
    this.formService.open({
      formConfig: {userName}, 
      title: "Oppdater passord", 
      formComponent: NewPasswordFormComponent
    })

  private configureMainNav(){
    this.mainNavService.addConfig({
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {
        title:  "Brukere",
        buttons: [{
          icon: "person_add", 
          colorClass: "color-accent",
          aria: 'Ny bruker',
          callback: this.openUserForm, 
          allowedRoles: [Roles.Leder]
        }]
      }
    });
  }

}
