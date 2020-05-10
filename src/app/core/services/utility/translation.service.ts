import { Injectable } from '@angular/core';
import { translations } from '../../../../translations'

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor() {}

  translateProperty(property: string): string{
    const hit = translations.modelProperties.find(x => x.key == property);
    if(hit === undefined) return property;
    return hit.value
  }
}
