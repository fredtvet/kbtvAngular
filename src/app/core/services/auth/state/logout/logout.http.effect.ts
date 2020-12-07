import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '@core/services/api.service';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { LogoutActionId, LogoutCommand } from './logout-command.interface';
import { WipeTokensActionId } from './wipe-tokens.reducer';

@Injectable()
export class LogoutHttpEffect implements Effect<LogoutCommand> {

    constructor(
        private apiService: ApiService,
        private router: Router,
    ){ }

    handle$(actions$: Observable<DispatchedAction<LogoutCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([LogoutActionId]),
            tap(x =>  this.router.navigate(['/login'], { queryParams: {returnUrl: x.action.returnUrl}})),
            map(x => { 
                if(x.action.refreshToken) 
                    this.apiService.post('/Auth/logout', {refreshToken: x.action.refreshToken}).subscribe()

                return {actionId: WipeTokensActionId} 
            })
        )
    }
}