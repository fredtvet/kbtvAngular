import { Component, Input, EventEmitter, Output } from '@angular/core';
import { halfwayRotate } from 'src/app/shared-app/animations';
import { AppButton } from '../../interfaces/app-button.interface';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['nav-item.component.scss'],
  animations: [halfwayRotate]
})
export class NavItemComponent {

  @Input() navButton: AppButton;

  @Output() hasNavigated = new EventEmitter();

  childrenShown: boolean = false;

  constructor() { }

  navItemClick = () => {
    if(this.navButton.children && this.navButton.children != null && this.navButton.children.length > 0){
      this.childrenShown = !this.childrenShown; //Toggle children if present
    }
    else if(this.navButton.routerLink && this.navButton.routerLink != null){
      this.hasNavigated.emit(); //Alert that navigation has happen if no children to show
    }
  };

  alertNavigation = () => this.hasNavigated.emit();

}
