import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/services';
import { AppPages } from 'src/app/shared-app/enums';


const routes: Routes = [
{
  path: '',
  loadChildren: () => import('src/app/mission/mission-list/mission-list.module').then(m => m.MissionListModule),
  canActivate: [AuthGuard],data: {preload: true, page: AppPages.MissionList}
},
{
  path: ':id/bilder',
  loadChildren: () => import('src/app/mission/mission-image-list/mission-image-list.module').then(m => m.MissionImageListModule),
  canActivate: [AuthGuard],data: {preload: true, page: AppPages.MissionImages}
},
{
  path: ':id/dokumenter',
  loadChildren: () => import('src/app/mission/mission-document-list/mission-document-list.module').then(m => m.MissionDocumentListModule),
  canActivate: [AuthGuard],data: {preload: true, page: AppPages.MissionDocuments},
},
{
  path: ':id/notater',
  loadChildren: () => import('src/app/mission/mission-note-list/mission-note-list.module').then(m => m.MissionNoteListModule),
  canActivate: [AuthGuard],data: {preload: true, page: AppPages.MissionNotes},
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
