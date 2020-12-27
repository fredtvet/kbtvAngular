import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '@http/injection-tokens.const';
import { COMMAND_API_MAP } from '../../injection-tokens.const';
import { CommandApiMap } from '../../interfaces';
import { Effect, DispatchedAction } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ModelStateConfig } from '../../model-state.config';
import { ModelCommand } from '../../model-command.enum';
import { MailModelsAction } from './mail-models.action';

@Injectable()
export class MailModelsHttpEffect implements Effect<MailModelsAction<unknown>>{

    constructor(
        private httpClient: HttpClient,
        @Inject(BASE_API_URL) private baseUrl: string,
        @Inject(COMMAND_API_MAP) private apiMap: CommandApiMap,
    ) {}
    
    handle$(actions$: Observable<DispatchedAction<MailModelsAction<unknown>>>): Observable<void> {
        return actions$.pipe(
            listenTo([MailModelsAction]),
            mergeMap(({action}) => 
                this.httpClient.post<void>(
                    this.baseUrl + ModelStateConfig.get(action.stateProp).apiUrl + this.apiMap[ModelCommand.Mail].suffix, 
                    {ids: action.ids, toEmail: action.toEmail}
                )),
        )
    }
}