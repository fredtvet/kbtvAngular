import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  private commandLoadingSubject = new BehaviorSubject<boolean>(false);
  commandLoading$ = this.commandLoadingSubject.asObservable().pipe(distinctUntilChanged(), shareReplay());

  private queryLoadingSubject = new BehaviorSubject<boolean>(false);
  queryLoading$ = this.queryLoadingSubject.asObservable().pipe(distinctUntilChanged(), shareReplay());

  constructor() { }

  setCommandLoading(loading: boolean){
    this.commandLoadingSubject.next(loading);
  }

  setQueryLoading(loading: boolean){
    this.queryLoadingSubject.next(loading);
  }
}
