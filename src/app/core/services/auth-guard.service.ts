import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from './identity.service';
import { NotificationService } from './notification.service';
import { NOTIFICATIONS } from '../../shared/notifications.enum'


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private identityService: IdentityService,
    private notificaitonService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if(!this.identityService.hasValidToken()){
        this.identityService.purgeAuth();
        this.router.navigate(['/login']);
        return false;
    }

    if(route.data['allowedRoles']){
      if(!route.data['allowedRoles'].includes(this.identityService.getCurrentUser().role)){
        this.notificaitonService.setNotification('Du mangler riktig autorisasjon for å gå inn på denne siden.',NOTIFICATIONS.Error);
        this.router.navigate(['/hjem']);
        return false;
      }
    }

    return true;
  }
}
