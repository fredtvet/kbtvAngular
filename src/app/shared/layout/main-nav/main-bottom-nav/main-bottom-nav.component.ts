import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Roles } from '../../../enums/roles.enum';

@Component({
  selector: 'app-main-bottom-nav',
  templateUrl: './main-bottom-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBottomNavComponent {
  Roles = Roles;

  constructor() { }

}
