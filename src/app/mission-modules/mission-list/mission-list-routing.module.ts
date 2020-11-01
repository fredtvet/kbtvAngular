import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { RolePresets } from 'src/app/shared-app/enums';

const routes: Routes = [
  {
    path: '',
    component: MissionListComponent,
    data: {depth: 1},
    children: [
      {
        path: ':id/detaljer',
        component: MissionDetailsComponent,
        data: {child: true},
        children: [
          {
            path: 'timer',
            data: {child: true},
            loadChildren: () => import('src/app/timesheet-modules/user-timesheet-list/user-timesheet-list.module').then(m => m.UserTimesheetListModule),
          },
          {
            path: 'bilder',
            data: {child: true},
            loadChildren: () => import('src/app/mission-modules/mission-image-list/mission-image-list.module').then(m => m.MissionImageListModule),
          },
          {
            path: 'dokumenter',
            data: {allowedRoles: RolePresets.Internal.valueOf(), child: true},
            loadChildren: () => import('src/app/mission-modules/mission-document-list/mission-document-list.module').then(m => m.MissionDocumentListModule),
        
          },
          {
            path: 'notater',
            data: {allowedRoles: RolePresets.Internal.valueOf(), child: true},
            loadChildren: () => import('src/app/mission-modules/mission-note-list/mission-note-list.module').then(m => m.MissionNoteListModule),
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
