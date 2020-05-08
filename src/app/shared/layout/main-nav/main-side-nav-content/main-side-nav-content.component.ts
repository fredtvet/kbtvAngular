import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from 'src/app/core/services';
import { User } from 'src/app/shared/models/user.model';
import { Roles } from 'src/app/shared/enums/roles.enum';

@Component({
  selector: 'app-main-side-nav-content',
  templateUrl: './main-side-nav-content.component.html',
  styleUrls: ['./main-side-nav-content.component.scss']
})
export class MainSideNavContentComponent implements OnInit {
  Roles = Roles;
  
  @Input() user: User;
  @Output() navItemClicked = new EventEmitter();
  @Output() hasLoggedOut = new EventEmitter();

  isOnline$:  Observable<boolean> = this.connectionService.isOnline$;
  
  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
  }

  onNavItemClick = () => this.navItemClicked.emit();

  onLogOut = () => this.hasLoggedOut.emit();

}
