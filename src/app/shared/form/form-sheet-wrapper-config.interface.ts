
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { FormComponent } from './form-component.interface';

export interface FormSheetWrapperConfig<TFormConfig, TFormState, TForm>{
    formConfig?: TFormConfig;
    formState$?: Observable<TFormState>;
    navConfig?: MainTopNavConfig;
    submitCallback?: (val: TForm) => void;
    formComponent?: Type<FormComponent<TFormConfig, TFormState, TForm>>;
}