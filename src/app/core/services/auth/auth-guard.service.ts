import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { NotificationService } from '../ui/notification.service';
import { AuthService } from './auth.service';
import { Notifications } from 'src/app/shared/enums';
import { DialogService } from '../dialog.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificaitonService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if(!this.authService.hasTokens()) {
      this.authService.logout();
      return false;
    }
    else if(this.authService.hasAccessTokenExpired()){
        this.authService.refreshToken$().subscribe();
    }

    if(route.data['allowedRoles']){
      if(!route.data['allowedRoles'].includes(this.authService.currentUser.role)){
        this.notificaitonService.setNotification('Du mangler riktig autorisasjon for å gå inn på denne siden.',Notifications.Error);
        this.router.navigate(['/hjem']);
        return false;
      }
    }

    return true;
  }
}
