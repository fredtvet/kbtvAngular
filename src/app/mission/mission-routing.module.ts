import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
