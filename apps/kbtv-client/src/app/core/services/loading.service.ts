import { Injectable } from '@angular/core';
import { StateRequestQueue } from 'optimistic-http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from 'state-management';

export interface LoadingResponse { loading: boolean, optimisticCount: number | undefined }

@Injectable({providedIn: 'root'})
export class LoadingService {

  private httpLoadingSubject = new BehaviorSubject<boolean>(false);

  httpLoading$ = this.httpLoadingSubject.asObservable().pipe(distinctUntilChanged());

  private optimisticCount$ = this.store.selectProperty$("requestQueue").pipe(
    map(x => x?.length),
    distinctUntilChanged()
  )

  loading$: Observable<LoadingResponse> = combineLatest([
    this.httpLoading$, 
    this.optimisticCount$
  ]).pipe(
    map(([loading, optimisticCount]) => { return {loading, optimisticCount} })
  );

  constructor(private store: Store<StateRequestQueue>) { }

  setHttpLoading(loading: boolean){
    this.httpLoadingSubject.next(loading);
  }

}
