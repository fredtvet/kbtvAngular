import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
  ],
})
export class LoginModule {}
