import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Notifications } from 'src/app/shared/enums';
import { NotificationService } from '../ui/notification.service';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private identityService: IdentityService,
    private notificaitonService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if(!this.identityService.hasValidToken()){
        this.identityService.purgeAuth();
        this.router.navigate(['/login']);
        return false;
    }

    if(route.data['allowedRoles']){
      if(!route.data['allowedRoles'].includes(this.identityService.getCurrentUser().role)){
        this.notificaitonService.setNotification('Du mangler riktig autorisasjon for å gå inn på denne siden.',Notifications.Error);
        this.router.navigate(['/hjem']);
        return false;
      }
    }

    return true;
  }
}
