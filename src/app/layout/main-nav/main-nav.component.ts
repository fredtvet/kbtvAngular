import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from "@angular/router";
import { AuthService, MainNavService } from 'src/app/core/services';
import { MatDrawer } from '@angular/material/sidenav';
import { routeAnimation } from '../route.animation';
import { MainNavConfig } from 'src/app/shared-app/interfaces';
import { LayoutTopNavs, Roles } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  animations: [ routeAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  @ViewChild('drawer') drawer:MatDrawer;
  
  LayoutTopNavs = LayoutTopNavs
  Roles = Roles;

  config$: Observable<MainNavConfig> = this.mainNavService.config$;

  constructor(
    private mainNavService: MainNavService,
    private authService: AuthService) { }

  toggleDrawer(isXs:boolean){if(isXs) this.drawer.toggle()}

  handleLogout(){
    this.authService.logout();
  }  
  
  prepareRoute(outlet: RouterOutlet) {
    //console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
