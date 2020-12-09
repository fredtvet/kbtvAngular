import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoadingService {

  private commandLoadingSubject = new BehaviorSubject<boolean>(false);
  commandLoading$ = this.commandLoadingSubject.asObservable().pipe(distinctUntilChanged());

  private queryLoadingSubject = new BehaviorSubject<boolean>(false);
  queryLoading$ = this.queryLoadingSubject.asObservable().pipe(distinctUntilChanged());

  loading$ = combineLatest([this.queryLoading$, this.commandLoading$]).pipe(map(x => (x[0] || x[1])))

  constructor() { }

  setCommandLoading(loading: boolean){
    this.commandLoadingSubject.next(loading);
  }

  setQueryLoading(loading: boolean){
    this.queryLoadingSubject.next(loading);
  }
}
