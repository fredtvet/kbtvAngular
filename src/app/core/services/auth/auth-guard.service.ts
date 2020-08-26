import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, UrlSegment, CanActivateChild } from '@angular/router';
import { Notifications } from 'src/app/shared-app/enums';
import { NotificationService } from '../ui/notification.service';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authStore: AuthStore,
    private notificaitonService: NotificationService
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.authCheck(route.data['allowedRoles']);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.authCheck(route.data['allowedRoles']);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.authCheck(route.data['allowedRoles']);
  }

  private authCheck(allowedRoles: string[]){
    if(!this.authStore.hasTokens) {
      this.authStore.logout();
      return false;
    }
    else if(this.authStore.hasAccessTokenExpired){
      this.authStore.refreshToken$().subscribe();
    }

    if(this.authStore.currentUser && allowedRoles && !allowedRoles.includes(this.authStore.currentUser?.role)){
      this.notificaitonService.notify({title: 'Du mangler riktig autorisasjon for å gå inn på denne siden.', type: Notifications.Error})
      this.router.navigate(['/hjem']);
      return false;    
    }

    return true;
  }
}
