import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelFormEntryComponent } from 'src/app/core/services/model/form/components/model-form-entry.component';
import { MissionNoteFormViewComponent } from './mission-note-form-view/mission-note-form-view.component';


const routes: Routes = [
  {
    path: '',
    component: ModelFormEntryComponent,
    data: {viewComponent: MissionNoteFormViewComponent, stateProp: "missionNotes"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionNoteFormRoutingModule { }
