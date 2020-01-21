import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from './identity.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private identityService: IdentityService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {

    if(!this.identityService.hasValidToken()){
        return this.router.navigate(['/login']);
    }

    if(route.data['allowedRoles']){
      if(!route.data['allowedRoles'].includes(this.identityService.getUserRole())){
        return this.router.navigate(['/login']); //Should navigate to a forbidden component
      }
    }

    return true;
  }
}
