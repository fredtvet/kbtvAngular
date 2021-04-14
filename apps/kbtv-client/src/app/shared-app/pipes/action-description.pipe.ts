import { Pipe, PipeTransform } from '@angular/core';
import { Immutable, Maybe } from 'global-types';
import { StateAction } from 'state-management';
import { ActionDescriptions } from '../action-descriptions.const';

@Pipe({name: 'actionDescription'})
export class ActionDescriptionPipe implements PipeTransform {

  transform(action: Maybe<Immutable<StateAction>>): string {
    if(action?.type) {
      const fn = ActionDescriptions[action.type];
      if(fn) return fn(action)
    }
    return "Mangler beskrivelse"
  }
}
