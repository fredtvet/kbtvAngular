import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent, BottomNavComponent, SearchBarComponent } from '../shared';
import { AuthGuard } from '../core';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionNoteDetailsComponent } from './mission-note-details/mission-note-details.component';


const routes: Routes = [
{
  path: '',
  component: MissionListComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
},
{
  path: ':id/detaljer',
  component: MissionDetailsComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
},
{
  path: ':missionId/notater/:id',
  component: MissionNoteDetailsComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
