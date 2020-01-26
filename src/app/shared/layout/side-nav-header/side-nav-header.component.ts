import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { IdentityService } from 'src/app/core';

@Component({
  selector: 'app-side-nav-header',
  templateUrl: './side-nav-header.component.html',
  styleUrls: ['./side-nav-header.component.css']
})
export class SideNavHeaderComponent implements OnInit {

  public user: User;

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
    this.identityService.currentUser$
    .subscribe(user => this.user = user);
  }

}
