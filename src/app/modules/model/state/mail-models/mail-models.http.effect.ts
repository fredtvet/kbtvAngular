import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '@http/injection-tokens.const';
import { COMMAND_API_MAP } from '../../injection-tokens.const';
import { CommandApiMap } from '../../interfaces';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MailModelsActionId, MailModelsStateCommand } from './mail-models-state-command.interface';
import { ModelStateConfig } from '../../model-state.config';
import { ModelCommand } from '../../model-command.enum';

@Injectable()
export class MailModelsHttpEffect implements Effect<MailModelsStateCommand<any>>{

    constructor(
        private httpClient: HttpClient,
        @Inject(BASE_API_URL) private baseUrl: string,
        @Inject(COMMAND_API_MAP) private apiMap: CommandApiMap,
    ) {}
    
    handle$(actions$: Observable<DispatchedAction<MailModelsStateCommand<any>>>): Observable<void> {
        return actions$.pipe(
            listenTo([MailModelsActionId]),
            mergeMap(({action}) => 
                this.httpClient.post<void>(
                    this.baseUrl + ModelStateConfig.get(action.stateProp).apiUrl + this.apiMap[ModelCommand.Mail].suffix, 
                    {ids: action.ids, toEmail: action.toEmail}
                )),
        )
    }
}