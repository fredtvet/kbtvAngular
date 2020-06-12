import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';


const routes: Routes = [
  {
    path: '',
    component: MissionImageListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionImageListRoutingModule { }
