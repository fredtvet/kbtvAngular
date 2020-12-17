import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Maybe } from '@global/interfaces';
import { EMPTY, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class RolePreloadService implements PreloadingStrategy {  

    constructor(private authService: AuthService){ }

    preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
      const user = this.authService.getCurrentUser();
      if(!this.preloadCheck(route, user?.role)) return EMPTY;
      return timer(2000).pipe(switchMap(x => load()))
    }
  
    private preloadCheck(route: Route, role: Maybe<string>): boolean {
      return (
        route.data && role &&
        (!route.data['allowedRoles'] || route.data['allowedRoles'].includes(role))
      )
    }
  
}
