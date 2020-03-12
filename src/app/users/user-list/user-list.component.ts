import { Component } from '@angular/core';
import { UsersService, IdentityService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { SubscriptionComponent } from 'src/app/subscription.component';
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
    private usersService: UsersService,
    private identityService: IdentityService,
    private router: Router) { super() }

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

}
