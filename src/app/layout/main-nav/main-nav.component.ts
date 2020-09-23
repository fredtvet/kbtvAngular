import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterOutlet } from "@angular/router";
import { Observable } from 'rxjs';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { TrackByAppButton } from 'src/app/shared-app/track-by-app-button';
import { MainNavConfig } from '../interfaces/main-nav-config.interface';
import { MainNavService } from '../main-nav.service';
import { routeAnimation } from '../route.animation';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  animations: [ routeAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  @ViewChild('drawer') drawer: MatDrawer;

  ButtonTypes = ButtonTypes;

  config$: Observable<MainNavConfig<any>> = this.mainNavService.config$;

  constructor(private mainNavService: MainNavService) { 

  }

  toggleDrawer = () => this.drawer.toggle();

  prepareRoute(outlet: RouterOutlet) {
    // console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['page']);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['page'];
  }

  trackByFab = TrackByAppButton;

}
