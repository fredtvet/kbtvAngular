import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { HttpQueuer } from '../../http.queuer';
import { HttpSuccessAction } from './http-success.action';

@Injectable()
export class HttpSuccessEffect implements Effect<HttpSuccessAction> {

    constructor(private httpQueuer: HttpQueuer) {}

    handle$(actions$: Observable<DispatchedAction<HttpSuccessAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([HttpSuccessAction]),
            map(x => this.httpQueuer.next())
        )
    }

}