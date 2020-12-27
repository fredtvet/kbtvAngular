import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [
    NotificationComponent,
  ],
  imports: [ 
      CommonModule, 
      FlexLayoutModule,
      MatIconModule,
      MatSnackBarModule
  ],
  exports: [],
  providers: [],
})
export class NotificationModule { }
