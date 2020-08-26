import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionNoteFormEntryComponent } from './mission-note-form-entry.component';


const routes: Routes = [
  {
    path: '',
    component: MissionNoteFormEntryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionNoteFormRoutingModule { }
