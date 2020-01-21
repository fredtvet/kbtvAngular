import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent, BottomNavComponent } from '../shared';
import { AuthGuard } from '../core';
import { EmployerListComponent } from './employer-list/employer-list.component';


const routes: Routes = [
  {
    path: '',
    component: EmployerListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
