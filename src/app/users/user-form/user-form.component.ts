import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RolesService, UsersService, NotificationService, MainNavService } from 'src/app/core/services';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, take, filter } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})

export class UserFormComponent extends SubscriptionComponent  {
  Roles = Roles;

  isCreateForm = false;

  user$: Observable<User>;

  roles$: Observable<string[]>;

  constructor(
    private mainNavService: MainNavService,
    private notificationService: NotificationService,
    private _rolesService: RolesService,
    private _usersService: UsersService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog, 
  ){ 
    super();
    let userName = this._route.snapshot.paramMap.get('userName');
    if(!userName) this.isCreateForm = true;
    this.configureMainNav(userName);
  }

    ngOnInit(){
      if(!this.isCreateForm)
        this.user$ = this._usersService.get$(this._route.snapshot.paramMap.get('userName'));

      this.roles$ = this._rolesService.getAll$().pipe(
        takeUntil(this.unsubscribe),
        map(arr => arr.filter(x => (x != Roles.Leder && x != Roles.Oppdragsgiver)))
      )
    }

    onSubmit(result: User){
      if(!result) this.onBack();
      else if(!this.isCreateForm) this.updateUser(result);
      else this.createUser(result);
    }

    private createUser(user: any){
      this._usersService.add$(user).subscribe(success => {
         this.notificationService.setNotification('Vellykket! Ny bruker registrert.');
         this.onBack();
        });
    }

    private updateUser(user: User){
      this._usersService.update$(user).pipe(take(1))
        .subscribe(success => {
          this.notificationService.setNotification('Vellykket oppdatering!');
          this.onBack();
        });
    }

    private deleteUser(username: string){
      this.onBack();
      this._usersService.delete$(username).pipe(take(1))
        .subscribe(res => {
          this.notificationService.setNotification('Vellykket! Bruker slettet.');
        });
    }

    private openDeleteDialog = (userName: string) => {
      let confirmString = 'Bekreft at du ønsker å slette "' + userName + '" fra systemet.'
      const deleteDialogRef = this._dialog.open(ConfirmDialogComponent,{data: confirmString});
      deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteUser(userName));
    }

    private configureMainNav(userName: string){
      let cfg = this.mainNavService.getDefaultConfig();   
      cfg.title = this.isCreateForm ? 'Ny bruker' : 'Rediger bruker';
      if(!this.isCreateForm){
        cfg.bottomSheetButtons = [
          {text: "Slett", icon: "delete_forever", callback: this.openDeleteDialog, params: [userName],  allowedRoles: [Roles.Leder]}
        ];
      }
      cfg.backFn = this.onBack;
      cfg.menuBtnEnabled = false;
      this.mainNavService.addConfig(cfg);
    }

    private onBack = () => {
      this._router.navigate(['brukere'])
    }

}
