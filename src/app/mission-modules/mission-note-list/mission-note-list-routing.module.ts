import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';
import { Roles } from 'src/app/shared-app/enums';


const routes: Routes = [
  {
    path: '',
    component: MissionNoteListComponent,
    children: [
      {path: 'skjema', data: {allowedRoles: [Roles.Leder]}, 
      loadChildren: () => import('src/app/mission-modules/mission-note-form/mission-note-form.module').then(m => m.MissionNoteFormModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionNoteListRoutingModule { }
