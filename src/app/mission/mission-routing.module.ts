import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';


const routes: Routes = [
{
  path: '',
  component: MissionListComponent,
  canActivate: [AuthGuard],
},
{
  path: ':id/detaljer',
  component: MissionDetailsComponent,
  canActivate: [AuthGuard],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
