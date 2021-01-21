import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoute } from '@shared-app/interfaces/custom-route.interface';
import { MainSkeletonRouteData } from '@shared/components/main-skeleton/main-skeleton-route-data.interface';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';

interface TimesheetWeekRoute extends CustomRoute<MainSkeletonRouteData>{}

const routes: TimesheetWeekRoute[] = [
  {
    path: '', data: {disableMaxWidth: true},
    component: UserTimesheetWeekComponent,
    children: [
      {
        path: 'liste', data: {viewType: "overlay", disableMaxWidth: true},
        loadChildren: () => import('src/app/feature-modules/timesheet-modules/user-timesheet-list/user-timesheet-list.module').then(m => m.UserTimesheetListModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserTimesheetWeekRoutingModule { }
