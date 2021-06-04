import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LoadPersistedStateAction } from 'state-db';
import { EffectsSubscriber, Store } from 'state-management';
import { DeviceInfoService } from './device-info.service';
import { IconService } from './icon.service';

@Injectable({providedIn: "root"})
export class StartupService {

  constructor(
    store: Store<unknown>,
    effectsSubscriber: EffectsSubscriber,
    iconService: IconService,
    deviceInfoService: DeviceInfoService,
    @Inject(DOCUMENT) document: Document
  ) { 
    if(deviceInfoService.isIphone) document.documentElement.style.setProperty('--bottom-nav-padding', '16px');
    
    effectsSubscriber.onEffectsInit$.subscribe(x => store.dispatch(<LoadPersistedStateAction> { type: LoadPersistedStateAction }))
    iconService.registerIcons();

  }
  
}
