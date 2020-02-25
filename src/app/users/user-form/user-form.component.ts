import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { RolesService, UsersService, NotificationService, LoadingService } from 'src/app/core';
import { User, ConfirmDeleteDialogComponent, ROLES, VertMenuParentExtension, NavAction } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})

export class UserFormComponent extends VertMenuParentExtension  {

  public ROLES = ROLES;

  isCreateForm = false;
  mainNavConfig = new MainNavConfig();

  user: User = new User();
  userSub: Subscription = new Subscription();

  roles$: Observable<string[]>;
  loading$: Observable<boolean>;

  constructor(
    private notificationService: NotificationService,
    private _rolesService: RolesService,
    private _usersService: UsersService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog) { super();}

    ngOnInit(){
      let userName = this._route.snapshot.paramMap.get('userName');

      this.roles$ =
        this._rolesService.getAll$().pipe(map(arr => arr.filter(x => x != ROLES.Leder)))

      if(!userName)
        this.isCreateForm = true;
      else
        this.userSub = this._usersService.get$(userName)
              .subscribe(result => this.user = result);

      this.configureMainNav();
    }

    onSubmit(result: User){
      if(!result) this.onBack();
      else if(!this.isCreateForm) this.updateUser(result);
      else this.createUser(result);
    }

    createUser(user: any){
      this._usersService.add$(user)
       .subscribe(success => {
         this.notificationService.setNotification('Vellykket! Ny bruker registrert.');
         this.onBack();
        });
    }

    updateUser(user: User){
      this._usersService.update$(user)
        .subscribe(success => {
          this.notificationService.setNotification('Vellykket oppdatering!');
          this.onBack();
        });
    }

    deleteUser(username: string){
      this.onBack();
      this._usersService.delete$(username)
        .subscribe(res => {
          this.notificationService.setNotification('Vellykket! Bruker slettet.');
        });
    }

    private openDeleteDialog = (e:string) => {
      const deleteDialogRef = this._dialog.open(ConfirmDeleteDialogComponent);

      deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.deleteUser(this.user.userName);
      });
    }

    configureMainNav(){
      if(!this.isCreateForm){
        this.vertActions = [new NavAction("Slett", "delete_forever", "delete", this.openDeleteDialog, [ROLES.Leder])];
        this.mainNavConfig.vertActions = this.vertActions;
      }
      this.mainNavConfig.title = this.isCreateForm ? 'Ny' : 'Rediger';
      this.mainNavConfig.title+= ' bruker';
      this.mainNavConfig.menuBtnEnabled = false;
    }

    onBack(): void {
      this._router.navigate(['brukere'])
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }

}
