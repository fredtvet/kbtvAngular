import { Component } from '@angular/core';
import { UsersService, IdentityService, MainNavService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent extends SubscriptionComponent {
  Roles = Roles;

  users: User[];
  currentUser: User;

  constructor(
    private mainNavService: MainNavService,
    private usersService: UsersService,
    private identityService: IdentityService,
    private router: Router) { 
      super();    
      this.configureMainNav(); 
    }

  ngOnInit() {
    combineLatest( //Calling seperate to have them ordered correctly. Should be done more efficiently.
      this.usersService.getByRole$(Roles.Leder),
      this.usersService.getByRole$(Roles.Mellomleder),
      this.usersService.getByRole$(Roles.Ansatt),
      this.usersService.getByRole$(Roles.Oppdragsgiver),
    )
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(([group1, group2, group3, group4]) => {this.users = [...group1, ...group2, ...group3, ...group4]});

    this.identityService.currentUser$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => this.currentUser = data);
  }

  editUser(userName: string){
    this.router.navigate(['brukere', userName, 'rediger'])
  }

  createUser(){
    this.router.navigate(['brukere', 'ny'])
  }

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Brukere";
    this.mainNavService.addConfig(cfg);
  }

}
