import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'confirm-dialog';
import { DynamicFormsModule } from 'dynamic-forms';
import { FormSheetModule } from 'form-sheet';
import { FetchModelProviders } from 'model/state-fetcher';
import { ModelFormComponent } from './model-form.component';
import { ModelFormService } from './model-form.service';

/** Responsible for declaring components and providing core injectables. 
 *  Use forFeature function to configure a default save converter for each feature module. */
@NgModule({
    declarations: [ ModelFormComponent ],
    imports: [
        CommonModule,
        DynamicFormsModule,
        FormSheetModule,
        ConfirmDialogModule,
    ],
    providers: [
        ModelFormService,
        ...FetchModelProviders
    ],
})
export class ModelFormModule { }
  