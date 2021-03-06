import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SyncModelState } from '../configurations/app-sync-state.config';
import { SyncConfig, SyncHttpFetcher, SyncResponse } from 'state-sync';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from 'state-auth';

@Injectable()
export class SyncHttpFetcherService implements SyncHttpFetcher<SyncModelState> {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  fetch$(config: SyncConfig, timestamp: number) : Observable<SyncResponse<SyncModelState>> {
    if(!this.authService.isAuthorized) return throwError("Unauthorized");

    let params = new HttpParams();

    const isInitial = timestamp == null;

    params = params.set("timestamp", isInitial ? config.initialTimestamp?.toString() : timestamp?.toString());

    const syncUrl = isInitial ? '/SyncAll/GetInitial' : '/SyncAll';

    return this.apiService.get(syncUrl, params);
  }
  
}