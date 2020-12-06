import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ApiUrl } from 'src/app/core/api-url.enum';
import { ApiService } from 'src/app/core/services/api.service';
import { DispatchedAction } from 'src/app/state/action-dispatcher';
import { StateAction } from 'src/app/state/interfaces';
import { Effect } from 'src/app/state/interfaces/effect.interface';
import { listenTo } from 'src/app/state/operators/listen-to.operator';
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