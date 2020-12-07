import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ApiService } from '@core/services/api.service';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { DispatchedAction } from '../../../state/action-dispatcher';
import { MailApiUrlMap } from './mail-api-url.map';
import { MailModelsActionId, MailModelsStateCommand } from './mail-models-state-command.interface';

@Injectable()
export class MailModelsHttpEffect implements Effect<MailModelsStateCommand>{

    constructor(private apiService: ApiService){}
    
    handle$(actions$: Observable<DispatchedAction<MailModelsStateCommand>>): Observable<StateAction> {
        return actions$.pipe(
            listenTo([MailModelsActionId]),
            mergeMap(({action}) => 
                this.apiService.post(MailApiUrlMap[action.stateProp], {ids: action.ids, toEmail: action.toEmail})),
        )
    }
}