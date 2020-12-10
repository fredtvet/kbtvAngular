import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { StateAction, Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { UpdatePasswordActionId, UpdatePasswordStateCommand } from './update-password-state-command.interface';

@Injectable()
export class UpdatePasswordHttpEffect implements Effect<UpdatePasswordStateCommand> {

    constructor(private apiService: ApiService){}

    handle$(actions$: Observable<DispatchedAction<UpdatePasswordStateCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([UpdatePasswordActionId]),
            mergeMap(({action}) => 
                this.apiService.put(`${ApiUrl.Auth}/changePassword`, action)),
        )
    }

}