import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterOutlet } from "@angular/router";
import { IdentityService, MainNavService } from 'src/app/core/services';
import { Roles } from '../../enums/roles.enum';
import { MatDrawer } from '@angular/material';
import { User } from '../../models/user.model';
import { MainNavConfig } from '../../interfaces/main-nav-config.interface';
import { routeAnimation} from '../../animations/route.animation';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  animations: [ routeAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  @ViewChild('drawer', {static: false}) drawer:MatDrawer;
  
  Roles = Roles;

  config$: Observable<MainNavConfig> = this.mainNavService.config$;
  currentUser$:  Observable<User> = this.identityService.currentUser$;

  constructor(
    private mainNavService: MainNavService,
    private identityService: IdentityService,
    private router: Router) { }

  toggleDrawer(isXs:boolean){if(isXs) this.drawer.toggle()}

  handleLogout(){
    this.identityService.purgeAuth();
    this.router.navigate(['/login']);
  }  
  
  prepareRoute(outlet: RouterOutlet) {
    //console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
