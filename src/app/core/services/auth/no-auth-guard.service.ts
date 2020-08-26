import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {
  constructor(   
    private router: Router,
    private authStore: AuthStore,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const returnUrl = route.queryParams['returnUrl'];  

    if(this.authStore.hasTokens){   
      if(returnUrl) this.router.navigateByUrl(returnUrl);
      else this.router.navigate(['/hjem']);
      return false;
    }

    return true;
  }
}
