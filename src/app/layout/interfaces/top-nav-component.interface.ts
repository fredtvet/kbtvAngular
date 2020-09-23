import { EventEmitter } from '@angular/core';

export interface TopNavComponent<TConfig>{
    config: TConfig;
    toggleDrawer: EventEmitter<any>
}