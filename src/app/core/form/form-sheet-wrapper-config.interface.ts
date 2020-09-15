
import { Type } from '@angular/core';
import { FormComponent } from './form-component.interface';

export interface FormSheetWrapperConfig<TFormConfig, TFormComponent extends FormComponent>{
    formConfig?: TFormConfig;
    onDeleteUri?: string;
    onCreateUri?: string;
    onUpdateUri?: string;
    customTitle?: string;
    formComponent?: Type<TFormComponent>
}