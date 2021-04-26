import { UpdateUserPasswordAction } from '@actions/user-actions';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';

@Injectable()
export class UpdateUserPasswordHttpEffect implements Effect<UpdateUserPasswordAction> {

    constructor(private apiService: ApiService){}

    handle$(actions$: Observable<DispatchedAction<UpdateUserPasswordAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([UpdateUserPasswordAction]),
            mergeMap(({action}) => 
                this.apiService.put<void>(`${ApiUrl.Users}/${action.userName}/NewPassword`, action)),
        )
    }
}