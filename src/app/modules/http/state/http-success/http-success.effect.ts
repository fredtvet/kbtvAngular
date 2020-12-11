import { Injectable } from '@angular/core';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpQueuer } from '../../http.queuer';
import { HttpSuccessAction } from './http-success.action';

@Injectable()
export class HttpSuccessEffect implements Effect<HttpSuccessAction> {

    constructor(private httpQueuer: HttpQueuer) {}

    handle$(actions$: Observable<DispatchedAction<HttpSuccessAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([HttpSuccessAction], false),
            map(x => this.httpQueuer.next())
        )
    }

}