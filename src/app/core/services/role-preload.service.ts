import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';
import { AuthStore } from './auth/auth.store';

export interface OnDemandRolePreloadOptions { page: AppPages }

@Injectable({ providedIn: 'root' })
export class RolePreloadService implements PreloadingStrategy {  

    constructor(private authStore: AuthStore){ }

    preload(route: Route, load: () => Observable<any>): Observable<any> {
      const user = this.authStore.getCurrentUser(false);
      if(!this.preloadCheck(route, user?.role)) return EMPTY;
      return timer(2000).pipe(switchMap(x => load()))
    }
  
    private preloadCheck(route: Route, role: string){
      return (
        route.data && role &&
        (!route.data['allowedRoles'] || route.data['allowedRoles'].includes(role))
      )
    }
  
}
