import { Prop } from 'src/app/shared-app/prop.type';
import { ActiveStringFilterConfig } from 'src/app/shared/interfaces';
import { OptionsGetter, Question } from '../../interfaces';

export interface AutoCompleteQuestion<T> extends Question {
    optionsGetter: OptionsGetter<T>;
    valueProp?: Prop<T>;
    resetable?: boolean;
    valueFormatter?: (val: T) => any;  
    displayWith?: (value: any) => string;
    activeFilter?: Omit<ActiveStringFilterConfig<T>, "stringChanges$" | "data">;
}