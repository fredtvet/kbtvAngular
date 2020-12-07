import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LoginPromptEntryComponent } from './login-prompt-entry.component';
import { LoginPromptRoutingModule } from './login-prompt-routing.module';
import { LoginFormComponent } from './login-prompt/login-form/login-form.component';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';

@NgModule({
  declarations: [
    LoginPromptEntryComponent,
    LoginPromptComponent,
    LoginFormComponent
  ],
  imports: [
    SharedModule,
    LoginPromptRoutingModule,
  ],
})
export class LoginPromptModule {}
