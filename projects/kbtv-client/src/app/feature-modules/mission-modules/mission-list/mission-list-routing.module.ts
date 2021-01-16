import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { CustomRoute } from '@shared-app/interfaces/custom-route.interface';
import { MainSkeletonRouteData } from '@shared/components/main-skeleton/main-skeleton-route-data.interface';
import { AuthRouteData } from 'state-auth';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { SelectedMissionIdParam } from './mission-list-route-params.const';
import { MissionListComponent } from './mission-list/mission-list.component';

interface MissionListRoute extends CustomRoute<AuthRouteData & MainSkeletonRouteData>{}

const routes: MissionListRoute[] = [
  {
    path: '',
    component: MissionListComponent,
    children: [
      {
        path: `:${SelectedMissionIdParam}/detaljer`,
        component: MissionDetailsComponent,
        data: {viewSize: "60%"},
        children: [
          {
            path: 'timer',
            data: {allowedRoles: RolePermissions.UserTimesheetList.access, viewSize: "overlay"},
            loadChildren: () => import('src/app/feature-modules/timesheet-modules/user-timesheet-list/user-timesheet-list.module').then(m => m.UserTimesheetListModule),
          },
          {
            path: 'bilder',
            data: {viewSize: "overlay"},
            loadChildren: () => import('src/app/feature-modules/mission-modules/mission-image-list/mission-image-list.module').then(m => m.MissionImageListModule),
          },
          {
            path: 'dokumenter',
            data: {allowedRoles: RolePermissions.MissionDocumentList.access, viewSize: "overlay"},
            loadChildren: () => import('src/app/feature-modules/mission-modules/mission-document-list/mission-document-list.module').then(m => m.MissionDocumentListModule),
        
          },
          {
            path: 'notater',
            data: {allowedRoles: RolePermissions.MissionNoteList.access, viewSize: "overlay"},
            loadChildren: () => import('src/app/feature-modules/mission-modules/mission-note-list/mission-note-list.module').then(m => m.MissionNoteListModule),
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
export class MissionListRoutingModule { }
