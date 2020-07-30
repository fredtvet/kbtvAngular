import { Component, Input, EventEmitter, Output } from '@angular/core';
import { halfwayRotate } from 'src/app/shared-app/animations';
import { NavItem } from '../../interfaces/nav-item.interface';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['nav-item.component.scss'],
  animations: [halfwayRotate]
})
export class NavItemComponent {

  @Input() navItem: NavItem = {
    icon: "dns",
    text: "Administrering",
    children: [
      {
        icon: "dns",
        text: "Data",
        routerLink: "/data"
      },
      {
        icon: "people",
        text: "Brukere",
        routerLink: "/brukere"
      },
      {
        icon: "assessment",
        text: "Timer",
        routerLink: "/timeadministrering",
      },
    ]
  } as NavItem;

  @Output() hasNavigated = new EventEmitter();

  childrenShown: boolean = false;

  constructor() { }

  navItemClick = () => {
    if(this.navItem.children && this.navItem.children != null && this.navItem.children.length > 0){
      this.childrenShown = !this.childrenShown; //Toggle children if present
    }
    else if(this.navItem.routerLink && this.navItem.routerLink != null){
      this.hasNavigated.emit(); //Alert that navigation has happen if no children to show
    }
  };

  alertNavigation = () => this.hasNavigated.emit();

}
