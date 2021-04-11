import { Question, OptionsGetter } from 'dynamic-forms';
import { Prop } from 'global-types';
import { ActiveStringFilterConfig } from '@shared/interfaces';
import { LazySelectOption } from '@shared-app/helpers/should-eager-options.helper';

export interface AutoCompleteQuestion<T> extends Question {
    optionsGetter: OptionsGetter<T>;
    valueProp?: Prop<T>;
    resetable?: boolean;
    valueFormatter?: (val: T) => unknown;  
    displayWith?: (value: unknown) => string;
    activeFilter?: Omit<ActiveStringFilterConfig<T>, "stringChanges$">;
    lazyOptions: LazySelectOption;
}