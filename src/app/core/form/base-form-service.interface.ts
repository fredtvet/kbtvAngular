import { FormSheetWrapperConfig } from 'src/app/core/form/form-sheet-wrapper-config.interface';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormSheetWrapperComponent } from 'src/app/core/services/form/form-sheet-wrapper.component';
import { FormSheetWrapperResult } from 'src/app/core/form/form-sheet-wrapper-result.interface';
import { BottomSheetService } from '../interfaces/bottom-sheet-service.interface';
import { FormComponent } from './form-component.interface';

export interface BaseFormService extends BottomSheetService {
    open(config: FormSheetWrapperConfig<any, FormComponent>): MatBottomSheetRef<FormSheetWrapperComponent, FormSheetWrapperResult>;
}