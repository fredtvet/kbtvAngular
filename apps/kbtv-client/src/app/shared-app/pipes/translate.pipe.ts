import { Pipe, PipeTransform } from '@angular/core';
import { translations } from '../constants/translations.const';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {

    transform(value: string, lowerCase?: boolean): string {
      const translation = translations[value.toLowerCase()] || value
      return lowerCase ? translation.toLowerCase() : translation;
    }

}
