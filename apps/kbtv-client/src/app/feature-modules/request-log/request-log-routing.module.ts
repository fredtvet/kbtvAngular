import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestLogComponent } from './request-log/request-log.component';

const routes: Routes = [
  {
    path: '',
    component: RequestLogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestLogRoutingModule { }
