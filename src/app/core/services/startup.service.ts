import { Injectable } from '@angular/core';
import { EffectsSubscriber } from '@state/effects.subscriber';
import { Store } from '@state/store';
import { IconService } from './icon.service';
import { LoadPersistedStateActionId } from '@persistance/state/actions.const';

@Injectable({providedIn: "root"})
export class StartupService {

  constructor(
    effectsSubscriber: EffectsSubscriber,
    store: Store<any>,
    iconService: IconService,
  ) { 
    effectsSubscriber.onEffectsInit$.subscribe(x => store.dispatch({actionId: LoadPersistedStateActionId}))
    iconService.registerIcons();
  }
  
}
