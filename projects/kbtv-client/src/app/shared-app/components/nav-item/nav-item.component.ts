import { Component, Input, EventEmitter, Output } from '@angular/core';
import { halfwayRotate } from '@shared/animations';
import { AppButton } from '../../interfaces/app-button.interface';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  animations: [halfwayRotate]
})
export class NavItemComponent {

  @Input() navButton: AppButton;

  @Output() hasNavigated = new EventEmitter();

  childrenShown: boolean = false;

  constructor() { }

  toggleChildren = () => {
    if(this.navButton.children && this.navButton.children.length > 0){
      this.childrenShown = !this.childrenShown; //Toggle children if present
    }
  };

  alertNavigation = () => this.hasNavigated.emit();

}
