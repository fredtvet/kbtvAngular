import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelBaseUrls } from '@core/configurations/model/model-base-urls.const';
import { Model } from '@core/models';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { MailModelsHttpRequest } from './mail-models-http-request.interface';
import { MailModelsAction } from './mail-models.action';

@Injectable()
export class MailModelsHttpEffect implements Effect<MailModelsAction<Model>>{

    constructor(private httpClient: HttpClient) {}
    
    handle$(actions$: Observable<DispatchedAction<MailModelsAction<Model>>>): Observable<void> {
        return actions$.pipe(
            listenTo([MailModelsAction]),
            mergeMap(({action}) => 
                this.httpClient.post<void>(
                    environment.apiUrl + ModelBaseUrls[action.stateProp] + "/Mail", 
                    <MailModelsHttpRequest> {ids: action.ids, toEmail: action.toEmail}
                )),
        )
    }
}