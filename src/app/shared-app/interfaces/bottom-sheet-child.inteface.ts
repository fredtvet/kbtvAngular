import { EventEmitter } from '@angular/core';

export interface BottomSheetChild<TConfig, TResult> {
    config: TConfig;
    formSubmitted: EventEmitter<TResult>;
}