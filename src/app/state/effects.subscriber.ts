import { Inject, Injectable, Optional, Self } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, first, takeUntil, tap } from 'rxjs/operators';
import { WithUnsubscribe } from 'src/app/shared-app/mixins/with-unsubscribe.mixin';
import { ActionDispatcher } from './action-dispatcher';
import { tryWithLogging } from './helpers/try-log-error.helper';
import { STORE_EFFECTS } from './injection-tokens';
import { Effect } from './interfaces/effect.interface';
import { Store } from './store';

@Injectable()
export class EffectsSubscriber extends WithUnsubscribe() {

    private effectsInitSubject = new BehaviorSubject<boolean>(false);
    onEffectsInit$ = this.effectsInitSubject.asObservable().pipe(first(x => x === true))

    constructor(
        private store: Store<any>,
        private dispatcher: ActionDispatcher,
        @Self() @Optional() @Inject(STORE_EFFECTS) effects: Effect<any>[]
    ){ 
        super(); 
   
        if(effects)
            for(const effect of effects) this.handleEffect(effect);
        
        this.effectsInitSubject.next(true);
    }

    private handleEffect(effect: Effect<any>): void {
        effect.handle$(this.dispatcher.actions$).pipe(   
            tap(x => (x && x.actionId) ? this.store.dispatch(x) : null),
            takeUntil(this.unsubscribe),
            catchError(x => this.onEffectError$(x, effect))
        ).subscribe();
    }

    private onEffectError$(err: any, effect: Effect<any>): Observable<any> {
        if(effect.onErrorAction) 
            this.store.dispatch(effect.onErrorAction(err))
      
        this.handleEffect(effect); //Resubscribe on error
 
        return throwError(err)
    }
}
