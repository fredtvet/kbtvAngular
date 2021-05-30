import { AppChip } from "../../interfaces/app-chip.interface";
import { Immutable, Maybe, Prop } from "global-types";

export interface CriteriaChipOptions<T> {
    valueFormatter?: ((val: T) => string | undefined) | string | undefined,
    ignored?: boolean,
}

export function _criteriaChipsFactory<TCriteria>(
    criteria: Immutable<TCriteria>, 
    removeFn: (prop: Prop<Immutable<TCriteria>>) => void,
    options?: {[key in keyof Immutable<TCriteria>]: CriteriaChipOptions<Immutable<TCriteria>[key]>},
): AppChip[] {
    const chips: AppChip[] = [];

    for(let prop in criteria){
      const value = criteria[prop];
      if(!value) continue;

      let text: string | undefined = value as string;
       
      if(options && options[prop]){
        const option = options[prop];
        if(option.ignored) continue; 
        if(option.valueFormatter instanceof Function) text = option.valueFormatter(value)
        else if(option.valueFormatter) text = option.valueFormatter;
      }

      chips.push({text, color: "accent", onRemoved: () => removeFn(prop)})
    }

    return chips;
  }
