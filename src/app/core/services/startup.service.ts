import { Injectable } from '@angular/core';
import { LoadPersistedStateAction } from '@persistance/state/actions.const';
import { EffectsSubscriber } from '@state/effects.subscriber';
import { Store } from '@state/store';
import { IconService } from './icon.service';

@Injectable({providedIn: "root"})
export class StartupService {

  constructor(
    effectsSubscriber: EffectsSubscriber,
    store: Store<any>,
    iconService: IconService,
  ) { 
    effectsSubscriber.onEffectsInit$.subscribe(x => store.dispatch(<LoadPersistedStateAction> { type: LoadPersistedStateAction }))
    iconService.registerIcons();
  }
  
}
