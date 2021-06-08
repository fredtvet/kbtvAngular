import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StateReaderService } from 'state-db';
import { EffectsSubscriber } from 'state-management';
import { DeviceInfoService } from './device-info.service';
import { IconService } from './icon.service';
import { SingleWindowGuardService } from './single-window-guard.service';

@Injectable({providedIn: "root"})
export class StartupService {

  constructor(
    effectsSubscriber: EffectsSubscriber,
    iconService: IconService,
    deviceInfoService: DeviceInfoService,
    stateReader: StateReaderService,
    singleWindowGuardService: SingleWindowGuardService,
    @Inject(DOCUMENT) document: Document
  ) { 
    stateReader.initalizeState('localStorage');
    effectsSubscriber.onEffectsInit$.subscribe(x => stateReader.initalizeState("idb-keyval"));
    
    if(deviceInfoService.isIphone) document.documentElement.style.setProperty('--bottom-nav-padding', '16px');

    iconService.registerIcons();

  }
  
}
