import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterOutlet } from "@angular/router";
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithUnsubscribe } from 'src/app/shared-app/mixins/with-unsubscribe.mixin';
import { routeAnimation } from '../animations/route.animation';
import { MainNavConfig } from '../interfaces/main-nav-config.interface';
import { MainNavService } from '../main-nav.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  animations: [ routeAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent extends WithUnsubscribe() {
  @ViewChild('drawer') drawer: MatDrawer;

  config$: Observable<MainNavConfig> = this.mainNavService.config$;

  private spamProtection = false;
  private currAnimationParams;

  constructor(private mainNavService: MainNavService) {
    super();
    this.mainNavService.toggleDrawer$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(x => this.toggleDrawer());
  }

  toggleDrawer = () => this.drawer.toggle();

  prepareRoute(outlet: RouterOutlet) {
    if(this.spamProtection) return this.currAnimationParams;
    this.setSpamProtection();
    if(!outlet || !outlet.activatedRouteData) return; 
    const {depth, section} = outlet.activatedRouteData;
    this.currAnimationParams = {depth, section};
    if(!depth || !section) return;
    return this.currAnimationParams;
  }

  //Prevent spam from multiple cd cycles on init. Mostly caused by pages with cdk virtual scroll ?
  setSpamProtection(){
    this.spamProtection = true;
    setTimeout(() => this.spamProtection = false, 10)
  }

}
