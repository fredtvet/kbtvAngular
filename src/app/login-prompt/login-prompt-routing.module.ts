import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPromptEntryComponent } from './login-prompt-entry.component';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';

const routes: Routes = [ 
  {
    path: '',
    component: LoginPromptEntryComponent,
    data: {page: AppPages.Login }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPromptRoutingModule { }
