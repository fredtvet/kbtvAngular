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
      {path: 'ny', data: {allowedRoles: RolePresets.Management.valueOf()}, 
      loadChildren: () => import('src/app/mission-modules/mission-form/mission-form.module').then(m => m.MissionFormModule)},
    ],
  },
  {
    path: ':id/detaljer',
    component: MissionDetailsComponent,
    data: {depth: 2},
    children: [
      {path: 'rediger', data: {allowedRoles: RolePresets.Authority.valueOf()},
      loadChildren: () => import('src/app/mission-modules/mission-form/mission-form.module').then(m => m.MissionFormModule)},
    ],
  },
  {
    path: ':id/bilder',
    data: {depth: 3},
    loadChildren: () => import('src/app/mission-modules/mission-image-list/mission-image-list.module').then(m => m.MissionImageListModule),
  },
  {
    path: ':id/dokumenter',
    data: {allowedRoles: RolePresets.Internal.valueOf(), depth: 3},
    loadChildren: () => import('src/app/mission-modules/mission-document-list/mission-document-list.module').then(m => m.MissionDocumentListModule),

  },
  {
    path: ':id/notater',
    data: {allowedRoles: RolePresets.Internal.valueOf(), depth: 3},
    loadChildren: () => import('src/app/mission-modules/mission-note-list/mission-note-list.module').then(m => m.MissionNoteListModule),
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionListRoutingModule { }
