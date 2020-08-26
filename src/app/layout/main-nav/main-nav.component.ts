import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterOutlet } from "@angular/router";
import { Observable } from 'rxjs';
import { MainNavService } from 'src/app/core/services';
import { ButtonTypes, LayoutTopNavs, Roles } from 'src/app/shared-app/enums';
import { AppButton, MainNavConfig } from 'src/app/shared-app/interfaces';
import { routeAnimation } from '../route.animation';

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
