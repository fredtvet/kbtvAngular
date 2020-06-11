import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';


const routes: Routes = [
{
  path: '',
  component: MissionListComponent,
  canActivate: [AuthGuard],data: {animation: 'MissionList'},
  children: [
    {path: 'ny', loadChildren: () => import('src/app/mission-modules/mission-form/mission-form.module').then(m => m.MissionFormModule)},
  ],
},
{
  path: ':id/detaljer',
  component: MissionDetailsComponent,
  canActivate: [AuthGuard],data: {animation: 'MissionDetails'},
  children: [
    {path: 'rediger', loadChildren: () => import('src/app/mission-modules/mission-form/mission-form.module').then(m => m.MissionFormModule)},
  ],
},
{
  path: ':id/bilder',
  component: MissionImageListComponent,
  canActivate: [AuthGuard],data: {animation: 'MissionImages'}
},
{
  path: ':id/dokumenter',
  component: MissionDocumentListComponent,
  canActivate: [AuthGuard],data: {animation: 'MissionDocuments'},
  children: [
    {path: 'skjema', loadChildren: () => import('src/app/mission-modules/mission-document-form/mission-document-form.module').then(m => m.MissionDocumentFormModule)},
  ],
},
{
  path: ':id/notater',
  component: MissionNoteListComponent,
  canActivate: [AuthGuard],data: {animation: 'MissionNotes'},
  children: [
    {path: 'skjema', loadChildren: () => import('src/app/mission-modules/mission-note-form/mission-note-form.module').then(m => m.MissionNoteFormModule)},
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
