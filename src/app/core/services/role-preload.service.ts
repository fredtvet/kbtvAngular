import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, from, Observable, timer } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { AppPages, Roles } from 'src/app/shared-app/enums';
import { AuthStore } from './auth/auth.store';

const strategies = new Map([ 
    [Roles.Oppdragsgiver, 
      [
        AppPages.Mission, AppPages.MissionImages, AppPages.MissionDocuments, AppPages.Profile
      ]
    ],
    [Roles.Ansatt, 
      [
        AppPages.Mission, AppPages.MissionImages, AppPages.Timesheet, AppPages.TimesheetForm, AppPages.MissionDocuments, 
        AppPages.MissionNotes, AppPages.Profile,
      ]
    ],
    [Roles.Mellomleder, 
      [
        AppPages.Mission, AppPages.MissionImages, AppPages.Timesheet, AppPages.TimesheetForm, AppPages.MissionDocuments, 
        AppPages.MissionForm, AppPages.MissionNotes, AppPages.Profile
      ]
    ],  
    [Roles.Leder, 
      [ 
        AppPages.Mission, AppPages.MissionImages, AppPages.MissionForm, AppPages.Timesheet, AppPages.TimesheetForm, 
        AppPages.MissionDocuments, AppPages.MissionNotes, AppPages.TimesheetStatistic, AppPages.Users, AppPages.TimesheetAdmin, 
        AppPages.DataManagement, AppPages.Profile
      ]
    ],  
]);

export interface OnDemandRolePreloadOptions { page: AppPages, priority: number }

@Injectable()
export class RolePreloadService implements PreloadingStrategy {  
    constructor(private authStore: AuthStore){ console.log("RolePreloadService"); }

    private totalPendingTime = 0;
    private pendingTimePerRoute = 2000;
    private speedUpPerRoute = 500;

    preload(route: Route, load: () => Observable<any>): Observable<any> {

      return this.authStore.currentUser$.pipe(
        switchMap(user => {
          let routes: OnDemandRolePreloadOptions[] =  [];
          if(user && strategies.get(user.role as Roles))
            routes = strategies.get(user.role as Roles).map((page, index) => { return {page, priority: index}});
          return from(routes);
        }), 
        mergeMap(options => {
          const shouldPreload = this.preloadCheck(route, options);
          if(!shouldPreload) return EMPTY;

          if(this.pendingTimePerRoute >= this.speedUpPerRoute)
            this.pendingTimePerRoute-= this.speedUpPerRoute;
          else this.pendingTimePerRoute = 0;

          this.totalPendingTime+=this.pendingTimePerRoute;

          return timer(this.totalPendingTime).pipe(switchMap(x => load()))
        })
      );
    }
  
    private preloadCheck(route: Route, preloadRoleOptions: OnDemandRolePreloadOptions){
      return (
        route.data &&
        route.data['preload'] && 
        route.data['page'] == preloadRoleOptions.page
      )
    }
  
  }
