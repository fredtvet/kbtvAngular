import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';


const routes: Routes = [
  {
    path: '',
    component: MissionNoteListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionNoteListRoutingModule { }
