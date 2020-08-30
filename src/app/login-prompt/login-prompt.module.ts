import { NgModule } from '@angular/core';

import { LoginPromptRoutingModule } from './login-prompt-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';
import { LoginPromptEntryComponent } from './login-prompt-entry.component';
import { LoginFormComponent } from './login-prompt/login-form/login-form.component';


@NgModule({
  declarations: [
    LoginPromptEntryComponent,
    LoginPromptComponent,
    LoginFormComponent
  ],
  imports: [
    SharedModule,
    LoginPromptRoutingModule
  ]
})
export class LoginPromptModule { 
  constructor(){
    console.log("loginpromptMOdule");
  } 
}
