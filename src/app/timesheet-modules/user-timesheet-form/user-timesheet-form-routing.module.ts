import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelFormEntryComponent } from 'src/app/core/services/model/form/components/model-form-entry.component';
import { UserTimesheetFormToSaveModelAdapter } from './user-timesheet-form-view/user-timesheet-form-to-save-model.adapter';
import { UserTimesheetFormViewComponent } from './user-timesheet-form-view/user-timesheet-form-view.component';


const routes: Routes = [
  {
    path: '',
    component: ModelFormEntryComponent,
    data: {
        viewComponent: UserTimesheetFormViewComponent, 
        adapter: UserTimesheetFormToSaveModelAdapter, 
        stateProp: "userTimesheets"
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTimesheetFormRoutingModule { }
