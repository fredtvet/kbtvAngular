import { BehaviorSubject, Observable } from 'rxjs';
import { skip, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';

export abstract class PersistentSubject<T> {

  protected dataSubject: BehaviorSubject<T>;

  protected data$: Observable<T>;

  constructor(
    protected localStorageService: LocalStorageService,
    protected storageKey:string,
    initalValue?:T) {

    this.dataSubject = new BehaviorSubject<T>(this.localStorageService.get(this.storageKey) || initalValue || undefined);
    this.data$ = this.dataSubject.asObservable();

    this.data$.pipe(skip(1)).subscribe(data => {
      this.localStorageService.add(this.storageKey, data);
    });
  }

}
