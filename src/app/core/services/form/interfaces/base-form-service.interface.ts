import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormSheetWrapperComponent } from 'src/app/core/services/form/form-sheet-wrapper.component';
import { BottomSheetService } from 'src/app/shared-app/interfaces';
import { FormComponent } from './form-component.interface';
import { FormSheetWrapperConfig } from './form-sheet-wrapper-config.interface';
import { FormSheetWrapperResult } from './form-sheet-wrapper-result.interface';

export interface BaseFormService extends BottomSheetService {
    open(config: FormSheetWrapperConfig<any, FormComponent>): MatBottomSheetRef<FormSheetWrapperComponent, FormSheetWrapperResult>;
}