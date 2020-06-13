import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RolePresets, Roles } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-main-bottom-nav',
  templateUrl: './main-bottom-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBottomNavComponent {
  RolePresets = RolePresets;
  Roles = Roles;

  constructor() { }

}
