/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 import {ChangeDetectorRef, EventEmitter, OnDestroy, Pipe, PipeTransform, ɵisPromise, ɵisSubscribable} from '@angular/core';
 import {Subscribable, Unsubscribable} from 'rxjs';
 
 interface SubscriptionStrategy {
   createSubscription(async: Subscribable<any>|Promise<any>, updateLatestValue: any): Unsubscribable
       |Promise<any>;
   dispose(subscription: Unsubscribable|Promise<any>): void;
   onDestroy(subscription: Unsubscribable|Promise<any>): void;
 }
 
 class SubscribableStrategy implements SubscriptionStrategy {
   createSubscription(async: Subscribable<any>, updateLatestValue: any): Unsubscribable {
     return async.subscribe({
       next: updateLatestValue,
       error: (e: any) => {
         throw e;
       }
     });
   }
 
   dispose(subscription: Unsubscribable): void {
     subscription.unsubscribe();
   }
 
   onDestroy(subscription: Unsubscribable): void {
     subscription.unsubscribe();
   }
 }
 
 class PromiseStrategy implements SubscriptionStrategy {
   createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): Promise<any> {
     return async.then(updateLatestValue, e => {
       throw e;
     });
   }
 
   dispose(subscription: Promise<any>): void {}
 
   onDestroy(subscription: Promise<any>): void {}
 }
 
 const _promiseStrategy = new PromiseStrategy();
 const _subscribableStrategy = new SubscribableStrategy();

 @Pipe({name: 'asyncDetect', pure: false})
 export class AsyncDetectPipe implements OnDestroy, PipeTransform {
   private _latestValue: any = null;
 
   private _subscription: Unsubscribable|Promise<any>|null = null;
   private _obj: Subscribable<any>|Promise<any>|EventEmitter<any>|null = null;
   private _strategy: SubscriptionStrategy = null!;
 
   constructor(private _ref: ChangeDetectorRef) {}
 
   ngOnDestroy(): void {
     if (this._subscription) {
       this._dispose();
     }
   }
 
   transform<T>(obj: Subscribable<T>|Promise<T>): T|null;
   transform<T>(obj: null|undefined): null;
   transform<T>(obj: Subscribable<T>|Promise<T>|null|undefined): T|null;
   transform<T>(obj: Subscribable<T>|Promise<T>|null|undefined): T|null {
     if (!this._obj) {
       if (obj) {
         this._subscribe(obj);
       }
       return this._latestValue;
     }
 
     if (obj !== this._obj) {
       this._dispose();
       return this.transform(obj);
     }
 
     return this._latestValue;
   }
 
   private _subscribe(obj: Subscribable<any>|Promise<any>|EventEmitter<any>): void {
     this._obj = obj;
     this._strategy = this._selectStrategy(obj);
     this._subscription = this._strategy.createSubscription(
         obj, (value: Object) => this._updateLatestValue(obj, value));
   }
 
   private _selectStrategy(obj: Subscribable<any>|Promise<any>|EventEmitter<any>): any {
     if (ɵisPromise(obj)) {
       return _promiseStrategy;
     }
 
     if (ɵisSubscribable(obj)) {
       return _subscribableStrategy;
     }
 
     throw 'Async detect pipe error';
   }
 
   private _dispose(): void {
     this._strategy.dispose(this._subscription!);
     this._latestValue = null;
     this._subscription = null;
     this._obj = null;
   }
 
   private _updateLatestValue(async: any, value: Object): void {
     if (async === this._obj) {
        const notNull = this._latestValue !== null
        this._latestValue = value;
        if(notNull) this._ref.detectChanges();
     }
   }
 }