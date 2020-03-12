import { Component } from '@angular/core';
import { IdentityService, EmployerService } from 'src/app/core/services';
import { Employer, User } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { Router } from '@angular/router';
import { SubscriptionComponent } from 'src/app/subscription.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html'
})

export class EmployerListComponent extends SubscriptionComponent {
  public Roles = Roles;

  public employers: Employer[];

  public currentUser: User;

  constructor(
    private employerService: EmployerService,
    private identityService: IdentityService,
    public router: Router) {super()}

  ngOnInit() {
    this.employerService.getAll$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => this.employers = data)

    this.identityService.currentUser$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => this.currentUser = data);
  }

  editEmployer(id:number){
    this.router.navigate(['oppdragsgivere', id, 'rediger'])
  }

  createEmployer(){
    this.router.navigate(['oppdragsgivere', 'ny'])
  }

}
