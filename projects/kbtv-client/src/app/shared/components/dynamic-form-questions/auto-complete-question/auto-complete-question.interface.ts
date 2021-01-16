import { Question, OptionsGetter } from 'dynamic-forms';
import { Prop } from 'global-types';
import { ActiveStringFilterConfig } from '@shared/interfaces';

export interface AutoCompleteQuestion<T> extends Question {
    optionsGetter: OptionsGetter<T>;
    valueProp?: Prop<T>;
    resetable?: boolean;
    valueFormatter?: (val: T) => unknown;  
    displayWith?: (value: unknown) => string;
    activeFilter?: Omit<ActiveStringFilterConfig<T>, "stringChanges$">;
}