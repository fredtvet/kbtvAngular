import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { LoginSuccessAction } from './login-success.action';

@Injectable()
export class RedirectToUrlEffect implements Effect<LoginSuccessAction> {

    constructor(private router: Router){}

    handle$(actions$: Observable<DispatchedAction<LoginSuccessAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([LoginSuccessAction]),
            map(x => { 
                if(x.action.returnUrl) this.router.navigateByUrl(x.action.returnUrl) 
                else this.router.navigate(["/"])
            }),
        )
    }
}