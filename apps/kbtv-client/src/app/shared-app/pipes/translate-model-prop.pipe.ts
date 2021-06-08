import { Pipe, PipeTransform } from '@angular/core';
import { AppModelStatePropTranslations } from '@shared-app/constants/model-state-prop-translations.const';

@Pipe({name: 'translateModelProp'})
export class TranslateModelPropPipe implements PipeTransform {

    transform(value: string, singular?: boolean, lowerCase?: boolean): string {
      const translation = AppModelStatePropTranslations[value.toLowerCase()];
      const word = singular ? translation.singular : translation.plural;
      return lowerCase ? word.toLowerCase() : word;
    }

}
