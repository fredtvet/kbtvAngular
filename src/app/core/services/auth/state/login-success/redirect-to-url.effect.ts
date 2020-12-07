import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction } from '@state/action-dispatcher';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { LoginSuccessActionId, LoginSuccessCommand } from './login-success-command.interface';

@Injectable()
export class RedirectToUrlEffect implements Effect<LoginSuccessCommand> {

    constructor(private router: Router){}

    handle$(actions$: Observable<DispatchedAction<LoginSuccessCommand>>): Observable<void> {
        return actions$.pipe(
            listenTo([LoginSuccessActionId]),
            map(x => { 
                if(x.action.returnUrl) this.router.navigateByUrl(x.action.returnUrl) 
                else this.router.navigate(["/"])
            }),
        )
    }
}