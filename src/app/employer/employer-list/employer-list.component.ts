import { Component, OnInit } from '@angular/core';
import { IdentityService, EmployerService } from 'src/app/core';
import { Employer, ROLES, User } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html'
})
export class EmployerListComponent implements OnInit {
  public ROLES = ROLES;

  constructor(
    private employerService: EmployerService,
    private identityService: IdentityService,
    public router: Router) { }

  public employers: Employer[];

  public currentUser: User;

  ngOnInit() {
    this.employerService.getAll$().subscribe(data => this.employers = data)
    this.identityService.currentUser$.subscribe(data => this.currentUser = data);
  }

  editEmployer(id:number){
    this.router.navigate(['oppdragsgivere', id, 'rediger'])
  }

  createEmployer(){
    this.router.navigate(['oppdragsgivere', 'ny'])
  }

}
