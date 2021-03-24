import { Injectable } from '@angular/core';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { translations } from '@shared-app/translations';
import { Immutable, Prop } from 'global-types';

export interface CriteriaChipOptions {
  valueFormatter?: ((val: Immutable<unknown>) => string | string),
  ignored?: boolean,
}

@Injectable({ providedIn: "root" })
export class ChipsFactoryService {

  constructor() {}

  createCriteriaChips<TCriteria>(
    criteria: Immutable<TCriteria>, 
    removeFn: (prop: Prop<Immutable<TCriteria>>) => void,
    options?: {[key in keyof Immutable<TCriteria>]: CriteriaChipOptions},
): AppChip[] {
    const chips: AppChip[] = [];

    for(let prop in criteria){
      const value = criteria[prop];
      if(!value) continue;

      let text = value as string;
       
      if(options && options[prop]){
        const option = options[prop];
        if(option.ignored) continue; 
        if(option.valueFormatter instanceof Function) text = option.valueFormatter(text)
        else if(option.valueFormatter) text = option.valueFormatter;
      }

      chips.push({text, color: "accent", onRemoved: () => removeFn(prop)})
    }

    return chips;
  }

  createEnumSelectionChips<TEnum extends { [s: number]: string }>(
      _enum: TEnum, 
      currentSelection: unknown,
      selectFn: (val: Immutable<unknown>) => void
    ): AppChip[] {
    const chips: AppChip[] = [];
    const options = Object.keys(_enum).filter(key => isNaN(Number(_enum[key as unknown as number])));
    for(const strVal of options){
      const value = parseInt(strVal);
      const selected = (value === currentSelection)
      chips.push({ 
        text: translations[_enum[value].toLowerCase()] , color: selected ? "accent" : "background", 
        onClick: !selected ? () => selectFn(value) : undefined
      })
    }
    return chips;
  }
}