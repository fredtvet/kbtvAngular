import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from "@angular/core";

@Injectable()
export class AppHammerConfig extends HammerGestureConfig  {
    overrides = {
        'pinch': { enable: false },
        'rotate': { enable: false },
        'pan': {enable: false}
    }
    options = {
        domEvents: true,
    }
}