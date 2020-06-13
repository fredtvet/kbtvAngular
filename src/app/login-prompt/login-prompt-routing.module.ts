import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPromptEntryComponent } from './login-prompt-entry.component';


const routes: Routes = [ 
  {
    path: '',
    component: LoginPromptEntryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPromptRoutingModule { }
