import { ComponentType } from '@angular/cdk/portal';
import { FilterComponent } from './filter-component.interface';

export interface FilterSheetWrapperConfig<TConfig>{
    formConfig?: TConfig;
    formComponent?: ComponentType<FilterComponent<TConfig, any>>
}