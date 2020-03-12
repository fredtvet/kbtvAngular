import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RolesService, UsersService, NotificationService } from 'src/app/core/services';
import { ConfirmDeleteDialogComponent, VertMenuParent, NavAction } from 'src/app/shared/components';
import { User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { Router, ActivatedRoute } from '@angular/router';
import { MainNavConfig } from 'src/app/shared/layout';
import { Observable } from 'rxjs';
import { map, takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})

export class UserFormComponent extends VertMenuParent  {
  Roles = Roles;

  isCreateForm = false;

  mainNavConfig = new MainNavConfig();

  user: User = new User();

  roles$: Observable<string[]>;

  constructor(
    private notificationService: NotificationService,
    private _rolesService: RolesService,
    private _usersService: UsersService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog) { super();}

    ngOnInit(){
      let userName = this._route.snapshot.paramMap.get('userName');

      this.roles$ = this._rolesService.getAll$().pipe(
        takeUntil(this.unsubscribe),
        map(arr => arr.filter(x => x != Roles.Leder))
      )

      if(!userName) this.isCreateForm = true;
      else
        this._usersService.get$(userName).pipe(takeUntil(this.unsubscribe))
        .subscribe(result => this.user = result);

      this.configureMainNav();
    }

    onSubmit(result: User){
      if(!result) this.onBack();
      else if(!this.isCreateForm) this.updateUser(result);
      else this.createUser(result);
    }

    createUser(user: any){
      this._usersService.add$(user).pipe(take(1))
       .subscribe(success => {
         this.notificationService.setNotification('Vellykket! Ny bruker registrert.');
         this.onBack();
        });
    }

    updateUser(user: User){
      this._usersService.update$(user).pipe(take(1))
        .subscribe(success => {
          this.notificationService.setNotification('Vellykket oppdatering!');
          this.onBack();
        });
    }

    deleteUser(username: string){
      this.onBack();
      this._usersService.delete$(username).pipe(take(1))
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
        this.vertActions = [new NavAction("Slett", "delete_forever", "delete", this.openDeleteDialog, [Roles.Leder])];
        this.mainNavConfig.vertActions = this.vertActions;
      }
      this.mainNavConfig.title = this.isCreateForm ? 'Ny' : 'Rediger';
      this.mainNavConfig.title+= ' bruker';
      this.mainNavConfig.menuBtnEnabled = false;
    }

    onBack(): void {
      this._router.navigate(['brukere'])
    }

}
