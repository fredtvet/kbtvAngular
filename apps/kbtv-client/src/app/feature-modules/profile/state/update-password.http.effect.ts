import { UpdatePasswordAction } from '@actions/profile-actions';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/api-url.enum';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';

@Injectable()
export class UpdatePasswordHttpEffect implements Effect<UpdatePasswordAction> {

    constructor(private apiService: ApiService){}

    handle$(actions$: Observable<DispatchedAction<UpdatePasswordAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([UpdatePasswordAction]),
            mergeMap(({action}) => 
                this.apiService.put<void>(`${ApiUrl.Auth}/changePassword`, action)),
        )
    }

}