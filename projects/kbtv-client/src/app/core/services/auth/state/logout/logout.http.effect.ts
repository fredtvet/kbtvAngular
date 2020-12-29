import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { LogoutAction } from './logout.action';
import { WipeTokensAction } from './wipe-tokens.reducer';

@Injectable()
export class LogoutHttpEffect implements Effect<LogoutAction> {

    constructor(
        private apiService: ApiService,
        private router: Router,
    ){ }

    handle$(actions$: Observable<DispatchedAction<LogoutAction>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([LogoutAction]),
            tap(x =>  this.router.navigate(['/login'], { queryParams: {returnUrl: x.action.returnUrl}})),
            map(x => { 
                if(x.action.refreshToken) 
                    this.apiService.post('/Auth/logout', {refreshToken: x.action.refreshToken}).subscribe()

                return <WipeTokensAction>{ type: WipeTokensAction }
            })
        )
    }
}