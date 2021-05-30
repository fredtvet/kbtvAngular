import { Injectable } from '@angular/core';
import { ModelBaseUrls } from '../../configurations/model/model-base-urls.const';
import { Model } from '../../models';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { MailModelsHttpRequest } from './mail-models-http-request.interface';
import { MailModelsAction } from './mail-models.action';

@Injectable()
export class MailModelsHttpEffect implements Effect<MailModelsAction<Model>>{

    constructor(private apiService: ApiService) {}
    
    handle$(actions$: Observable<DispatchedAction<MailModelsAction<Model>>>): Observable<void> {
        return actions$.pipe(
            listenTo([MailModelsAction]),
            mergeMap(({action}) => 
                this.apiService.post<void>(
                    ModelBaseUrls[action.stateProp] + "/Mail", 
                    <MailModelsHttpRequest> {ids: action.ids, toEmail: action.toEmail}
                )),
        )
    }
}