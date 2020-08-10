import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionFormEntryComponent } from './mission-form-entry.component';


const routes: Routes = [
  {
    path: '',
    component: MissionFormEntryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionFormRoutingModule { }
