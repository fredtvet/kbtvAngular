import { Injectable } from '@angular/core';
import { QueuedCommand, StateRequestQueue } from 'optimistic-http';
import { Observable } from 'rxjs';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from 'state-management';
import { DeviceInfoService } from './device-info.service';

export interface LoadingResponse { loading: boolean, optimisticCount: number | undefined }

@Injectable({providedIn: 'root'})
export class LoadingService {

  private httpLoadingSubject = new BehaviorSubject<boolean>(false);
  httpLoading$ = combineLatest([
    this.httpLoadingSubject.asObservable().pipe(distinctUntilChanged()),
    this.deviceInfoService.isOnline$
  ]).pipe(map(([loading, isOnline]) => isOnline ? loading : false));

  private optimisticCount$ = this.store.selectProperty$<QueuedCommand[]>("requestQueue").pipe(
    map(x => x?.length),
    distinctUntilChanged()
  )

  loading$: Observable<LoadingResponse> = combineLatest([
    this.httpLoading$, 
    this.optimisticCount$
  ]).pipe(map(([loading, optimisticCount]) => { return {loading, optimisticCount} }));

  constructor(
    private store: Store<StateRequestQueue>, 
    private deviceInfoService: DeviceInfoService
  ) { }

  setHttpLoading(loading: boolean){
    this.httpLoadingSubject.next(loading);
  }

}
