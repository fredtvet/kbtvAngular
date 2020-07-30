import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceInfoService } from 'src/app/core/services';
import { Roles, RolePresets } from 'src/app/shared-app/enums/roles.enum';
import { User } from 'src/app/core/models';

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

  isOnline$:  Observable<boolean> = this.deviceInfoService.isOnline$;
  
  constructor(private deviceInfoService: DeviceInfoService) {}

  navItemClick = () => this.navItemClicked.emit();

}
