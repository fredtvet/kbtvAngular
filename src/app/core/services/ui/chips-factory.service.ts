import { Injectable } from '@angular/core';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { Prop } from '@state/interfaces';
import { translations } from '@shared/translations';
import { Immutable } from '@immutable/interfaces';

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
    if(!criteria) return;

    const chips: AppChip[] = [];

    for(let prop in criteria){
      const value = criteria[prop];
      if(!value) continue;

      let text = value as string;
      const chipOption = options[prop];
      
      if(chipOption){
        if(chipOption.ignored) continue; 
        if(chipOption.valueFormatter instanceof Function) text = chipOption.valueFormatter(text)
        else if(chipOption.valueFormatter) text = chipOption.valueFormatter;
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
    const options = Object.keys(_enum).filter(key => isNaN(Number(_enum[key])));
    for(const strVal of options){
      const value = parseInt(strVal);
      const selected = (value === currentSelection as unknown)
      chips.push({ 
        text: translations[_enum[value].toLowerCase()] , color: selected ? "accent" : "background", 
        onClick: !selected ? () => selectFn(value) : null
      })
    }
    return chips;
  }
}