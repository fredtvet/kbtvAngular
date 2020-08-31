import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, from, Observable, timer } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Roles } from 'src/app/shared-app/enums';
import { AuthStore } from './auth/auth.store';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';

const strategies = new Map([ 
    [Roles.Oppdragsgiver, 
      [
        AppPages.Home, AppPages.Mission, AppPages.MissionImages, AppPages.MissionDocuments, AppPages.Profile
      ]
    ],
    [Roles.Ansatt, 
      [
        AppPages.Home, AppPages.Mission, AppPages.MissionImages, AppPages.Timesheet, AppPages.TimesheetForm, AppPages.MissionDocuments, 
        AppPages.MissionNotes, AppPages.Profile,
      ]
    ],
    [Roles.Mellomleder, 
      [
        AppPages.Home, AppPages.Mission, AppPages.MissionImages, AppPages.Timesheet, AppPages.TimesheetForm, AppPages.MissionDocuments, 
        AppPages.MissionForm, AppPages.MissionNotes, AppPages.Profile
      ]
    ],  
    [Roles.Leder, 
      [ 
        AppPages.Home, AppPages.Mission, AppPages.MissionImages, AppPages.MissionForm, AppPages.Timesheet, AppPages.TimesheetForm, 
        AppPages.MissionDocuments, AppPages.MissionNotes, AppPages.TimesheetStatistic, AppPages.Users, AppPages.TimesheetAdmin, 
        AppPages.DataManagement, AppPages.Profile
      ]
    ],  
]);

export interface OnDemandRolePreloadOptions { page: AppPages }

@Injectable({ providedIn: 'root' })
export class RolePreloadService implements PreloadingStrategy {  

    private preloadedRoutes = {};

    constructor(private authStore: AuthStore){ console.log("RolePreloadService"); }

    preload(route: Route, load: () => Observable<any>): Observable<any> {
      return this.authStore.currentUser$.pipe(
        switchMap(user => {
          let routes: OnDemandRolePreloadOptions[] =  [];
          if(user && strategies.get(user.role as Roles))
            routes = strategies.get(user.role as Roles).map(page => {return {page}});
          return from(routes);
        }), 
        mergeMap(options => {
          const shouldPreload = this.preloadCheck(route, options);
          if(!shouldPreload) return EMPTY;
          console.log(route);
          this.preloadedRoutes[route.path] = true;
          return timer(2000).pipe(switchMap(x => load()))
        })
      );
    }
  
    private preloadCheck(route: Route, preloadRoleOptions: OnDemandRolePreloadOptions){
      return (
        route.data &&
        route.data['preload'] && 
        route.data['page'] == preloadRoleOptions.page &&
        !this.preloadedRoutes[route.path]
      )
    }
  
}
