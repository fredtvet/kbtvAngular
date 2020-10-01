import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterOutlet } from "@angular/router";
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared-app/components/subscription.component';
import { MainNavConfig } from '../interfaces/main-nav-config.interface';
import { MainNavService } from '../main-nav.service';
import { routeAnimation } from '../route.animation';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  animations: [ routeAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent extends SubscriptionComponent {
  @ViewChild('drawer') drawer: MatDrawer;

  config$: Observable<MainNavConfig> = this.mainNavService.config$;

  constructor(private mainNavService: MainNavService) {
    super();
    this.mainNavService.toggleDrawer$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(x => this.toggleDrawer());
  }

  toggleDrawer = () => this.drawer.toggle();

  prepareRoute(outlet: RouterOutlet) {
    // console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['page']);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['depth'];
  }

}
