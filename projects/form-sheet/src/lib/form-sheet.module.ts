import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DynamicFormsModule } from 'dynamic-forms';
import { FormSheetNavBarComponent } from './form-sheet-nav-bar/form-sheet-nav-bar.component';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';

/** Responisble for declaring components. */
@NgModule({
    declarations: [
        FormSheetWrapperComponent,
        FormSheetNavBarComponent,
    ],
    imports: [
        CommonModule,
        MatBottomSheetModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        DynamicFormsModule,
    ]
})
export class FormSheetModule {}
  