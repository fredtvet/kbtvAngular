import { Component } from '@angular/core';
import { IdentityService, EmployerService, MainNavService } from 'src/app/core/services';
import { Employer, User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html'
})

export class EmployerListComponent extends SubscriptionComponent {
  Roles = Roles;

  employers: Employer[];
  currentUser: User;

  innerNavButtons: AppButton[] = [];

  constructor(
    private employerService: EmployerService,
    private identityService: IdentityService,
    private mainNavService: MainNavService,
    public router: Router) {
      super(); 
      this.configureInnerNav();
    }

  ngOnInit() {
    this.mainNavService.addConfig();
    this.employerService.getAll$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => this.employers = data)

    this.identityService.currentUser$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => this.currentUser = data);
  }

  editEmployer = (id:number) => this.router.navigate(['oppdragsgivere', id, 'rediger'])
  
  createEmployer = () => this.router.navigate(['oppdragsgivere', 'ny'])
  

  private configureInnerNav(){
    this.innerNavButtons = [
      {
        icon: "add",
        colorClass: "color-accent",
        text: 'Ny',  
        aria: 'Nytt oppdrag',
        callback: this.createEmployer, 
        allowedRoles: [Roles.Leder, Roles.Mellomleder]
      }
    ]
  }
}
