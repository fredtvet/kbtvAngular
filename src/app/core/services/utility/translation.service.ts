import { Injectable } from '@angular/core';
import { translations } from '../../../../translations'

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor() {}

  translateProperty(property: string): string{
    const translation = translations.modelProperties[property];
    if(!translation) return property;
    return translation
  }
}
