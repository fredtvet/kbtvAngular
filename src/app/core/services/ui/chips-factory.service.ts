import { Injectable } from '@angular/core';
import { _formatDateRange } from 'src/app/shared-app/helpers/datetime/format-date-range.helper';
import { _formatShortDate } from 'src/app/shared-app/helpers/datetime/format-short-date.helper';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { translations } from 'src/app/shared/translations';
import { ModelStateConfig } from '../model/model-state.config';

@Injectable({ providedIn: "root" })
export class ChipsFactoryService {

  constructor() {}

  createFilterChips(criteria: Object, removeFn: (prop: string) => void): AppChip[] {
    if(!criteria) return;

    const chips: AppChip[] = [];

    for(let prop in criteria){
      const value = criteria[prop];
      if(!value || prop === "dateRangePreset") continue;   
      let text = value;
      if(value instanceof Array && value.length > 1 && new Date(value[0]) instanceof Date) 
        text = _formatDateRange(value, _formatShortDate);
      else if(value instanceof Date) text = _formatShortDate(value);
      else if(value instanceof Object){ 
        const fkPropModelMap = ModelStateConfig.getBy(prop, "foreignProp")
        text = fkPropModelMap ? value[fkPropModelMap.displayProp] : null;
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