import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ɵdetectChanges } from '@angular/core';
import { NavItem } from './nav-item.interface';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent {

  @Input() navButton: NavItem;

  @Output() hasNavigated = new EventEmitter();

  childrenShown: boolean = false;

  toggleChildren = () => {
    if(this.navButton.children && this.navButton.children.length > 0){
      this.childrenShown = !this.childrenShown; //Toggle children if present
      ɵdetectChanges(this);
    }
  };

  alertNavigation = () => this.hasNavigated.emit();

}
