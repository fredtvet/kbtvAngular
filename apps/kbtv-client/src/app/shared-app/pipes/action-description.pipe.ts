import { Pipe, PipeTransform } from '@angular/core';
import { ActionDescriptionMap } from '@shared-app/interfaces/action-description-map.interface';
import { Immutable, Maybe } from 'global-types';
import { StateAction } from 'state-management';

@Pipe({name: 'actionDescription'})
export class ActionDescriptionPipe implements PipeTransform {

  transform(action: Maybe<Immutable<StateAction>>, descriptions: ActionDescriptionMap): string {
    if(action?.type) {
      const fn = descriptions[action.type];
      if(fn) return fn(action)
    }
    return "Mangler beskrivelse"
  }
}
