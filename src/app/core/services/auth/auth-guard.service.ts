import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanLoad, UrlSegment, Route } from '@angular/router';
import { NotificationService } from '../ui/notification.service';
import { AuthService } from './auth.service';
import { Notifications } from 'src/app/shared-app/enums';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificaitonService: NotificationService
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.authCheck(route.data['allowedRoles']);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.authCheck(route.data['allowedRoles']);
  }

  private authCheck(allowedRoles: string[]){
    if(!this.authService.hasTokens()) {
      this.authService.logout();
      return false;
    }
    else if(this.authService.hasAccessTokenExpired()){
        this.authService.refreshToken$().subscribe();
    }

    if(allowedRoles && !allowedRoles.includes(this.authService.currentUser.role)){
      this.notificaitonService.setNotification('Du mangler riktig autorisasjon for å gå inn på denne siden.',Notifications.Error);
      this.router.navigate(['/hjem']);
      return false;    
    }

    return true;
  }
}
