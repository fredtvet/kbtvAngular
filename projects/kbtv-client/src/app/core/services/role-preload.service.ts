import { Injectable } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';
import { CustomRoute } from '@shared-app/interfaces/custom-route.interface';
import { Maybe } from 'global-types';
import { EMPTY, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthRouteData, AuthService } from 'state-auth';

@Injectable({ providedIn: 'root' })
export class RolePreloadService implements PreloadingStrategy {  

    constructor(private authService: AuthService){ }

    preload(route: CustomRoute<AuthRouteData>, load: () => Observable<unknown>): Observable<unknown> {
      const user = this.authService.getCurrentUser();
      if(!this.preloadCheck(route, user?.role)) return EMPTY;
      return timer(2000).pipe(switchMap(x => load()))
    }
  
    private preloadCheck(route: CustomRoute<AuthRouteData>, role: Maybe<string>): boolean {
      return route.data == null || 
      (role != null && (!route.data['allowedRoles'] || (route.data['allowedRoles'].indexOf(role) !== -1))
      )
    }
  
}
