import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagerComponent } from './data-manager/data-manager.component';


const routes: Routes = [
  {
    path: '', data: {disableMaxWidth: true},
    component: DataManagerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule {

}
