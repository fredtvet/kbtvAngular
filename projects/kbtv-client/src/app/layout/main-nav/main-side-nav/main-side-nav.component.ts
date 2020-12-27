import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MainSideNavConfig } from '../../interfaces/main-side-nav-config.interface';

@Component({
  selector: 'app-main-side-nav',
  templateUrl: './main-side-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSideNavComponent {

  @Input() config: MainSideNavConfig;
  @Output() navItemClicked = new EventEmitter();
  
  constructor() {}

  onNavClick = () => this.navItemClicked.emit();

}
