import { Injectable } from '@angular/core';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { Prop } from '@state/interfaces/prop.type';
import { translations } from '@shared/translations';

export interface CriteriaChipOptions {
  valueFormatter?: ((val: any) => string | string),
  ignored?: boolean,
}

@Injectable({ providedIn: "root" })
export class ChipsFactoryService {

  constructor() {}

  createCriteriaChips<TCriteria>(
    criteria: TCriteria, 
    removeFn: (prop: Prop<TCriteria>) => void,
    options?: {[key in keyof TCriteria]: CriteriaChipOptions},
): AppChip[] {
    if(!criteria) return;

    const chips: AppChip[] = [];

    for(let prop in criteria){
      const value = criteria[prop];
      if(!value) continue;

      let text: string = value as any;
      const chipOption = options[prop];
      
      if(chipOption){
        if(chipOption.ignored) continue; 
        if(chipOption.valueFormatter instanceof Function) text = chipOption.valueFormatter(value)
        else if(chipOption.valueFormatter) text = chipOption.valueFormatter;
      }

      chips.push({text, color: "accent", onRemoved: () => removeFn(prop)})
    }

    return chips;
  }

  createEnumSelectionChips<TEnum extends { [s: number]: string }>(
      _enum: TEnum, 
      currentSelection: any,
      selectFn: (val: any) => void
    ): AppChip[] {
    const chips: AppChip[] = [];
    const options = Object.keys(_enum).filter(key => isNaN(Number(_enum[key])));
    for(const strVal of options){
      const value = parseInt(strVal);
      const selected = (value === currentSelection as any)
      chips.push({ 
        text: translations[_enum[value].toLowerCase()] , color: selected ? "accent" : "background", 
        onClick: !selected ? () => selectFn(value) : null
      })
    }
    return chips;
  }
}