import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { SyncConfig, SyncHttpFetcher, SyncResponse, SyncStoreTimestamps } from '@sync/interfaces';
import { AppSyncStateConfig, SyncModelState } from '@shared-app/const/sync-state.config';
import { AuthService } from './auth';

@Injectable()
export class SyncHttpFetcherService implements SyncHttpFetcher<SyncModelState> {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  fetch$(config: SyncConfig, timestamps: SyncStoreTimestamps) : Observable<SyncResponse<SyncModelState>> {
    if(!this.authService.isAuthorized) return throwError("Unauthorized");

    let params = new HttpParams();

    params = params.set("initialNumberOfMonths", config?.initialNumberOfMonths)

    Object.keys(AppSyncStateConfig).forEach(prop => {
      let timestamp = timestamps ? timestamps[prop] : null;
      params = params.set(AppSyncStateConfig[prop]?.requestKey, timestamp ? timestamp.toString() : null);
    });

    return this.apiService.get('/SyncAll', params);
  }
  
}