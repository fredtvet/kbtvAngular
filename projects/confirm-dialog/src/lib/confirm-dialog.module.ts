import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    declarations: [
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule
    ],
})
export class ConfirmDialogModule { }