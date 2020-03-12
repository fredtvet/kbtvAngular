import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable().pipe(distinctUntilChanged());

  constructor() { }

  setLoading(loading: boolean){
    this.loadingSubject.next(loading);
  }
}
