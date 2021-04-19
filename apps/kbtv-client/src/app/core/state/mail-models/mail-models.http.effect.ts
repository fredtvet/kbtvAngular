import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelBaseUrls } from '@core/configurations/model/model-base-urls.const';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { MailModelsHttpRequest } from './mail-models-http-request.interface';
import { MailModelsAction } from './mail-models.action';

@Injectable()
export class MailModelsHttpEffect implements Effect<MailModelsAction<unknown>>{

    constructor(private httpClient: HttpClient) {}
    
    handle$(actions$: Observable<DispatchedAction<MailModelsAction<unknown>>>): Observable<void> {
        return actions$.pipe(
            listenTo([MailModelsAction]),
            mergeMap(({action}) => 
                this.httpClient.post<void>(
                    environment.baseUrl + ModelBaseUrls[action.stateProp] + "/Mail", 
                    <MailModelsHttpRequest> {ids: action.ids, toEmail: action.toEmail}
                )),
        )
    }
}