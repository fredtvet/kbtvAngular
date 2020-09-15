import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionFormViewComponent } from './mission-form-view/mission-form-view.component';
import { ModelFormEntryComponent } from 'src/app/core/services/model/form/model-form-entry.component';


const routes: Routes = [
  {
    path: '',
    component: ModelFormEntryComponent,
    data: {viewComponent: MissionFormViewComponent, stateProp: "missions"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionFormRoutingModule { }
