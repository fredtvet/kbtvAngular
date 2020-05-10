import { Component } from '@angular/core';
import { UserService, IdentityService, MainNavService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { takeUntil } from 'rxjs/operators';
import { AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent extends SubscriptionComponent {
  Roles = Roles;

  users: User[];
  currentUser: User;
  
  createButton: AppButton;

  constructor(
    private mainNavService: MainNavService,
    private userService: UserService,
    private identityService: IdentityService,
    private router: Router) { 
      super();    
      this.configureMainNav(); 
      this.configureCreateButton();
    }

  ngOnInit() {
    combineLatest( //Calling seperate to have them ordered correctly. Should be done more efficiently.
      this.userService.getByRole$(Roles.Leder),
      this.userService.getByRole$(Roles.Mellomleder),
      this.userService.getByRole$(Roles.Ansatt),
      this.userService.getByRole$(Roles.Oppdragsgiver),
    )
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(([group1, group2, group3, group4]) => {this.users = [...group1, ...group2, ...group3, ...group4]});

    this.identityService.currentUser$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => this.currentUser = data);
  }

  editUser = (userName: string) => this.router.navigate(['brukere', userName, 'rediger'])

  createUser = () => this.router.navigate(['brukere', 'ny'])  

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Brukere";
    this.mainNavService.addConfig(cfg);
  }

  private configureCreateButton(){
    this.createButton = {
        icon: "person_add", 
        colorClass: "color-accent",
        text: 'Ny', 
        aria: 'Ny bruker',
        callback: this.createUser, 
        allowedRoles: [Roles.Leder]
      }
    
  }

}
