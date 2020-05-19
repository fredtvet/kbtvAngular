import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Roles, RolePresets } from '../../../enums/roles.enum';

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
