import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthReturnUrlQueryParam } from '../auth-route-params.const';
import { AuthService } from './auth.service';
import { AUTH_DEFAULT_REDIRECTS } from '../injection-tokens.const';
import { DefaultRedirects } from '../interfaces';

/** Used to guard for authorized users and redirect them to a return url provided
 *  as a query parameter in the route. Optionally redirects to default home route.*/
@Injectable({providedIn: 'root'})
export class NoAuthGuard implements CanActivate {

  constructor(   
    private router: Router,
    private authService: AuthService,
    @Inject(AUTH_DEFAULT_REDIRECTS) private defaultRedirects: DefaultRedirects
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let returnUrl = route.queryParams[AuthReturnUrlQueryParam];  

    if(this.authService.isAuthorized){   
      if(returnUrl) this.router.navigateByUrl(returnUrl);
      else this.router.navigate([this.defaultRedirects.home]);
      return false;
    }

    return true;
  }
}
