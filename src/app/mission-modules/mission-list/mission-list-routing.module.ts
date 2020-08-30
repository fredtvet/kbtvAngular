import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { Roles, RolePresets } from 'src/app/shared-app/enums';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';

const routes: Routes = [
  {
    path: '',
    component: MissionListComponent, data: {page: AppPages.MissionList},
    children: [
      {path: 'ny', data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.MissionForm}, 
      loadChildren: () => import('src/app/mission-modules/mission-form/mission-form.module').then(m => m.MissionFormModule)},
    ],
  },
  {
    path: ':id/detaljer',
    component: MissionDetailsComponent, data: {page: AppPages.MissionDetails},
    children: [
      {path: 'rediger', data: {allowedRoles: [Roles.Leder]},
      loadChildren: () => import('src/app/mission-modules/mission-form/mission-form.module').then(m => m.MissionFormModule)},
    ],
  },
  {
    path: ':id/bilder',
    loadChildren: () => import('src/app/mission-modules/mission-image-list/mission-image-list.module').then(m => m.MissionImageListModule),
    data: {preload: true, page: AppPages.MissionImages}
  },
  {
    path: ':id/dokumenter',
    loadChildren: () => import('src/app/mission-modules/mission-document-list/mission-document-list.module').then(m => m.MissionDocumentListModule),
    data: {preload: true, allowedRoles: RolePresets.Internal, page: AppPages.MissionDocuments},
  },
  {
    path: ':id/notater',
    loadChildren: () => import('src/app/mission-modules/mission-note-list/mission-note-list.module').then(m => m.MissionNoteListModule),
    data: {preload: true, allowedRoles: RolePresets.Internal, page: AppPages.MissionNotes},
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionListRoutingModule { }
