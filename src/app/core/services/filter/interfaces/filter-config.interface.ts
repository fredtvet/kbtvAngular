import { Type } from '@angular/core';
import { BaseFormViewComponent } from '../../form/abstracts/base-form-view-component';

export interface FilterConfig<TViewConfig>{
    filterConfig?: TViewConfig
    viewComponent?: Type<BaseFormViewComponent<TViewConfig, any>>
}