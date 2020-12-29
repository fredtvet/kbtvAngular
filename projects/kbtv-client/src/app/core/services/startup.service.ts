import { Injectable } from '@angular/core';
import { LoadPersistedStateAction } from '@persistance/state/actions.const';
import { EffectsSubscriber, Store } from 'state-management';
import { IconService } from './icon.service';

@Injectable({providedIn: "root"})
export class StartupService {

  constructor(
    effectsSubscriber: EffectsSubscriber,
    store: Store<unknown>,
    iconService: IconService,
  ) { 
    effectsSubscriber.onEffectsInit$.subscribe(x => store.dispatch(<LoadPersistedStateAction> { type: LoadPersistedStateAction }))
    iconService.registerIcons();
  }
  
}
