import { Type } from '@angular/core';
import { BaseFormViewComponent } from 'src/app/core/form/abstracts/base-form-view-component';

export interface FilterConfig<TViewConfig>{
    filterConfig?: TViewConfig
    viewComponent?: Type<BaseFormViewComponent<TViewConfig, any>>
}