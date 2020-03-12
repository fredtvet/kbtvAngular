import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Roles } from '../shared/enums';
import { AuthGuard } from '../core/services';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MissionNoteFormComponent } from './mission-note-form/mission-note-form.component';


const routes: Routes = [
{
  path: '',
  component: MissionListComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
},
{
  path: 'ny',
  component: MissionFormComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
  data: {allowedRoles: [Roles.Leder, Roles.Mellomleder]}
},
{
  path: ':id/detaljer',
  component: MissionDetailsComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
},
{
  path: ':id/rediger',
  component: MissionFormComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
  data: {allowedRoles: [Roles.Leder]}
},
{
  path: ':missionId/notater/ny',
  component: MissionNoteFormComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard]
},
{
  path: ':missionId/notater/:id/rediger',
  component: MissionNoteFormComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
  data: {allowedRoles: [Roles.Leder]}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
