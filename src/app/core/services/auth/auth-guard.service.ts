import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService, NotificationType } from '../notification';
import { PersistanceStore } from '../persistance/persistance.store';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authStore: AuthStore,
    private notificaitonService: NotificationService,
    private persistanceStore: PersistanceStore,
  ) {}

  canLoad(route: Route): Observable<boolean> {
    return this.authCheck$(route.data['allowedRoles']);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>  {
    return this.authCheck$(route.data['allowedRoles']);
  }

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean>  {
    console.log(route);
    return this.authCheck$(route.data['allowedRoles']);
  }

  private authCheck$(allowedRoles: string[]){
    return this.persistanceStore.initialStateInitalized$
      .pipe(map(x => this.authCheck(allowedRoles)))
  }

  private authCheck(allowedRoles: string[]): boolean{
    if(!this.authStore.hasTokens) {
      this.authStore.logout();
      return false;
    }
    else if(this.authStore.hasAccessTokenExpired){
      this.authStore.refreshToken$().subscribe();
    }

    if(this.authStore.currentUser && allowedRoles && !allowedRoles.includes(this.authStore.currentUser?.role)){
      this.notificaitonService.notify({title: 'Du mangler riktig autorisasjon for å gå inn på denne siden.', type: NotificationType.Error})
      this.router.navigate(['/hjem']);
      return false;    
    }

    return true;
  }
}
