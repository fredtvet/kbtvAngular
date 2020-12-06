import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SyncConfig, SyncHttpFetcher, SyncResponse, SyncStoreTimestamps } from './sync/interfaces';
import { SyncStateConfig } from '../../shared-app/const/sync-state.config';

@Injectable()
export class SyncHttpFetcherService implements SyncHttpFetcher {

  constructor(private apiService: ApiService) {}

  fetch$(config: SyncConfig, timestamps: SyncStoreTimestamps) : Observable<SyncResponse> {
    let params = new HttpParams();

    params = params.set("initialNumberOfMonths", config?.initialNumberOfMonths)

    Object.keys(SyncStateConfig).forEach(prop => {
      let timestamp = timestamps ? timestamps[prop] : null;
      params = params.set(SyncStateConfig[prop]?.requestKey, timestamp ? timestamp.toString() : null);
    });

    return this.apiService.get('/SyncAll', params);
  }
  
}