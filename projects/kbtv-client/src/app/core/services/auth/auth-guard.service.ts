import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { NotificationService, NotificationType } from 'notification';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificaitonService: NotificationService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean  {
    return this.authCheck(route.data['allowedRoles']);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean  {
    return this.authCheck(route.data['allowedRoles']);
  }

  private authCheck(allowedRoles: string[]): boolean{
    if(!this.authService.isAuthorized) {
      this.authService.logout();
      return false;
    }
    else if(this.authService.hasAccessTokenExpired)
      this.authService.refreshToken();
    
    if(allowedRoles){
      const currentUser = this.authService.getCurrentUser();
      if(currentUser && allowedRoles.indexOf(currentUser?.role) === -1){
        this.notificaitonService.notify({title: 'Du mangler riktig autorisasjon for å gå inn på denne siden.', type: NotificationType.Error})
        this.router.navigate(['/hjem']);
        return false;    
      }
    }
    
    return true;
  }
}
