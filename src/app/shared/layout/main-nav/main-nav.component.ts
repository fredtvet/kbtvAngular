import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from "@angular/router";
import { AuthService, MainNavService } from 'src/app/core/services';
import { MatDrawer } from '@angular/material';
import { MainNavConfig } from '../../interfaces/main-nav-config.interface';
import { routeAnimation} from '../../animations/route.animation';
import { LayoutTopNavs } from '../../enums/layout-top-navs.enum';
import { Roles } from '../../enums/roles.enum';
import { User } from '../../interfaces/models/user.interface';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  animations: [ routeAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  @ViewChild('drawer', {static: false}) drawer:MatDrawer;
  
  LayoutTopNavs = LayoutTopNavs
  Roles = Roles;

  config$: Observable<MainNavConfig> = this.mainNavService.config$;
  currentUser$:  Observable<User> = this.authService.currentUser$;

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
