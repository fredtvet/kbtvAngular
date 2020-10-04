import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolePresets } from 'src/app/shared-app/enums';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';


const routes: Routes = [
  {
    path: '',
    component: MissionNoteListComponent,
    children: [
      {path: 'skjema', data: {allowedRoles: RolePresets.Authority.valueOf()}, 
      loadChildren: () => import('src/app/mission-modules/mission-note-form/mission-note-form.module').then(m => m.MissionNoteFormModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionNoteListRoutingModule { }
