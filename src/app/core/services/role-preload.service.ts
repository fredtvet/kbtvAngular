import { Injectable } from '@angular/core';
import { Roles, AppPages } from 'src/app/shared-app/enums';
import { from, Observable, EMPTY } from 'rxjs';
import { PreloadingStrategy, Route } from '@angular/router';
import { mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

const strategies = new Map([ 
    [Roles.Oppdragsgiver, 
      [
        AppPages.Profile, AppPages.Mission, AppPages.MissionImages, AppPages.MissionDocuments
      ]
    ],
    [Roles.Ansatt, 
      [
        AppPages.Profile, AppPages.Mission, AppPages.MissionImages, AppPages.MissionDocuments, 
        AppPages.MissionNotes, AppPages.Timesheet, AppPages.TimesheetForm
      ]
    ],
    [Roles.Mellomleder, 
      [
        AppPages.Profile, AppPages.Mission, AppPages.MissionImages, AppPages.MissionDocuments, 
        AppPages.MissionNotes, AppPages.Timesheet, AppPages.TimesheetForm, AppPages.MissionForm
      ]
    ],  
    [Roles.Leder, 
      [ 
        AppPages.Profile, AppPages.Mission, AppPages.MissionImages, AppPages.MissionDocuments, 
        AppPages.MissionNotes, AppPages.Timesheet, AppPages.TimesheetForm, AppPages.MissionForm,
        AppPages.TimesheetStatistic, AppPages.TimesheetAdmin, AppPages.DataManagement, AppPages.Users
      ]
    ],  
]);

export class OnDemandRolePreloadOptions {
    constructor(public page: AppPages, public preload = true) {}
}

@Injectable()
export class RolePreloadService implements PreloadingStrategy {  
    constructor(private authService: AuthService) { }
  
    preload(route: Route, load: () => Observable<any>): Observable<any> {

      return this.authService.currentUser$.pipe(
        switchMap(user => {
          console.log(route);
          let routes: OnDemandRolePreloadOptions[] =  [];

          if(strategies.get(user.role as Roles))
            routes = strategies.get(user.role as Roles).map(mod => new OnDemandRolePreloadOptions(mod, true));
          return from(routes);
        }), 
        mergeMap(role => {
          const shouldPreload = this.preloadCheck(route, role);
          return shouldPreload ? load() : EMPTY;
        })
      );
    }
  
    private preloadCheck(route: Route, preloadRoleOptions: OnDemandRolePreloadOptions){
      return (
        route.data &&
        route.data['preload'] && 
        route.data['page'] == preloadRoleOptions.page &&
        preloadRoleOptions.preload
      )
    }
  
  }
