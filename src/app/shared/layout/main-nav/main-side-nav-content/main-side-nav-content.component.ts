import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceInfoService } from 'src/app/core/services';
import { User } from 'src/app/shared/models/user.model';
import { Roles, RolePresets } from 'src/app/shared/enums/roles.enum';

@Component({
  selector: 'app-main-side-nav-content',
  templateUrl: './main-side-nav-content.component.html',
  styleUrls: ['./main-side-nav-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSideNavContentComponent {
  RolePresets = RolePresets;
  Roles = Roles;
  
  @Input() user: User;
  @Output() navItemClicked = new EventEmitter();
  @Output() hasLoggedOut = new EventEmitter();

  isOnline$:  Observable<boolean> = this.deviceInfoService.isOnline$;
  
  constructor(private deviceInfoService: DeviceInfoService) {}

  navItemClick = () => this.navItemClicked.emit();

  logOut = () => this.hasLoggedOut.emit();

}
