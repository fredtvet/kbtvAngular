import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import { Optional } from '@angular/core';

export abstract class PersistentSubject<T> {

  protected dataSubject: BehaviorSubject<T>;

  protected data$: Observable<T>;

  constructor(
    @Optional() protected localStorageService?: LocalStorageService,
    protected storageKey?:string,
    initalValue?:T,) {

    let persistanceEnabled = localStorageService && storageKey;
    let persistedValue = persistanceEnabled ? this.localStorageService.get(this.storageKey) : undefined;

    this.dataSubject = new BehaviorSubject<T>(persistedValue || initalValue || undefined);
    this.data$ = this.dataSubject.asObservable();

    if(persistanceEnabled)
      this.data$.pipe(skip(1)).subscribe(data => this.localStorageService.add(this.storageKey, data));   
  }

}
