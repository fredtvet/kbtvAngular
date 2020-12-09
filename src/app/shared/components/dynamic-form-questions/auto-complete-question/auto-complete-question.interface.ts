import { Question, OptionsGetter } from '@dynamic-forms/interfaces';
import { Prop } from '@state/interfaces/prop.type';
import { ActiveStringFilterConfig } from '@shared/interfaces';

export interface AutoCompleteQuestion<T> extends Question {
    optionsGetter: OptionsGetter<T>;
    valueProp?: Prop<T>;
    resetable?: boolean;
    valueFormatter?: (val: T) => any;  
    displayWith?: (value: any) => string;
    activeFilter?: Omit<ActiveStringFilterConfig<T>, "stringChanges$" | "data">;
}