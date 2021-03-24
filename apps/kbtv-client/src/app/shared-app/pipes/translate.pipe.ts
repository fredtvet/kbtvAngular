import { Pipe, PipeTransform } from '@angular/core';
import { translations } from '@shared-app/translations';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {

    transform(value: string, lowerCase?: boolean): string {
      const translation = translations[value.toLowerCase()] || value
      return lowerCase ? translation.toLowerCase() : translation;
    }

}
