import { Question, OptionsGetter } from 'dynamic-forms';
import { Prop } from 'global-types';
import { ActiveStringFilterConfig } from '@shared/interfaces';
import { LazySelectOption } from '@shared-app/helpers/should-eager-options.helper';

export interface AutoCompleteQuestion<T, TFormState extends object | null> extends Question<TFormState> {
    optionsGetter: OptionsGetter<T, TFormState>;
    valueProp?: Prop<T>;
    resetable?: boolean;
    valueFormatter?: (val: T) => unknown;  
    displayWith?: (value: T) => string;
    activeFilter?: Omit<ActiveStringFilterConfig<T>, "stringChanges$">;
    lazyOptions: LazySelectOption;
}