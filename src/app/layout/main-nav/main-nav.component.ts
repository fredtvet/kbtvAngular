import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from "@angular/router";
import { AuthService, MainNavService } from 'src/app/core/services';
import { MatDrawer } from '@angular/material/sidenav';
import { routeAnimation } from '../route.animation';
import { MainNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { LayoutTopNavs, Roles, ButtonTypes } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  animations: [ routeAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  @ViewChild('drawer') drawer:MatDrawer;
  ButtonTypes = ButtonTypes;
  LayoutTopNavs = LayoutTopNavs;
  Roles = Roles;

  config$: Observable<MainNavConfig> = this.mainNavService.config$;

  constructor(private mainNavService: MainNavService) { }

  toggleDrawer = (isXs:boolean) => isXs ? this.drawer.toggle() : null;

  prepareRoute(outlet: RouterOutlet) {
    //console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['page']);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['page'];
  }

  trackByFab = (index: number, fab: AppButton) => fab.icon;
}
