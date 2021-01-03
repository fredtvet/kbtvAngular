import { Inject, Injectable, Optional, Self } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, first, takeUntil, tap } from 'rxjs/operators';
import { ActionDispatcher } from './action-dispatcher';
import { STORE_EFFECTS } from './constants/injection-tokens.const';
import { Effect } from './interfaces';
import { StateAction } from './state.action';
import { Store } from './store';

@Injectable()
export class EffectsSubscriber {

    private effectsInitSubject = new BehaviorSubject<boolean>(false);
    onEffectsInit$ = this.effectsInitSubject.asObservable().pipe(first(x => x === true))

    unsubscribe : Subject<void> = new Subject();

    constructor(
        private store: Store<unknown>,
        private dispatcher: ActionDispatcher,
        @Self() @Optional() @Inject(STORE_EFFECTS) effects: Effect<StateAction>[]
    ){   
        if(effects)
            for(const effect of effects) this.handleEffect(effect);
        
        this.effectsInitSubject.next(true);
    }

    private handleEffect(effect: Effect<StateAction>): void {
        effect.handle$(this.dispatcher.actions$).pipe(   
            tap(x => (x && x.type) ? this.store.dispatch(x) : null),   
            catchError(x => this.onEffectError$(x, effect)),
            takeUntil(this.unsubscribe),
        ).subscribe();
    }

    private onEffectError$(err: unknown, effect: Effect<StateAction>): Observable<unknown> {
        if(effect.onErrorAction) 
            this.store.dispatch(effect.onErrorAction(err))
      
        this.handleEffect(effect); //Resubscribe on error
 
        return throwError(err)
    }
  
    ngOnDestroy(){
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
