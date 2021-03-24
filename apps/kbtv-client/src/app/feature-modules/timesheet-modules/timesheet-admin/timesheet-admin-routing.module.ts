import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRoute } from '@shared-app/interfaces/custom-route.interface';
import { MainSkeletonRouteData } from '@shared/components/main-skeleton/main-skeleton-route-data.interface';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';
import { TimesheetAdminUserListComponent } from './timesheet-admin-user-list/timesheet-admin-user-list.component';
import { TimesheetAdminWeekListComponent } from './timesheet-admin-week-list/timesheet-admin-week-list.component';

interface TimesheetAdminRoute extends CustomRoute<MainSkeletonRouteData>{}

const routes: TimesheetAdminRoute[] = [
  {
    path: '',
    component: TimesheetAdminUserListComponent,
    children:[
      {
        path: 'uker',
        component: TimesheetAdminWeekListComponent,
        data: {viewType: "overlay"},
        children: [
          {
            path: 'timer',
            component: TimesheetAdminListComponent,
            data: {viewSize: "60%", viewType: "card"},
          },
        ]
      },
    ]
  },  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetAdminRoutingModule { }
