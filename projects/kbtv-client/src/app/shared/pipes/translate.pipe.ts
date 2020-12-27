import { Pipe, PipeTransform } from '@angular/core';
import { translations } from '@shared/translations';

@Pipe({
  name: 'translate'
})

export class TranslatePipe implements PipeTransform {

    transform(value: string): string {
        return translations[value.toLowerCase()] || value;
    }

}
