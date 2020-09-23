import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RolePresets, Roles } from 'src/app/shared-app/enums/roles.enum';
import { SideNavNavigations } from '../../side-nav-navigations';
import { MainSideNavConfig } from '../../interfaces/main-side-nav-config.interface';

@Component({
  selector: 'app-main-side-nav',
  templateUrl: './main-side-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSideNavComponent {
  RolePresets = RolePresets;
  Roles = Roles;
  SideNavNavigations = SideNavNavigations
  
  @Input() config: MainSideNavConfig;
  @Output() navItemClicked = new EventEmitter();
  
  constructor() {}

  onNavClick = () => this.navItemClicked.emit();

}
