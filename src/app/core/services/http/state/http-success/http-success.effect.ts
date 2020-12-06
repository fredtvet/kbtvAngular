import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
import { HttpQueuer } from '../../http.queuer';
import { HttpSuccessActionId } from './http-success-command.interface';

@Injectable()
export class HttpSuccessEffect implements Effect<StateAction> {

    constructor(private httpQueuer: HttpQueuer) {}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([HttpSuccessActionId], false),
            map(x => this.httpQueuer.next())
        )
    }

}