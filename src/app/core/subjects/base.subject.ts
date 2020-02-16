import { BaseEntity  } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, skip } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

export abstract class BaseSubject<T extends BaseEntity> {

  protected dataSubject: BehaviorSubject<T[]>;

  public data$: Observable<T[]>;

  constructor(
    protected localStorageService: LocalStorageService,
    private storageKey:string) {

    this.dataSubject = new BehaviorSubject<T[]>(this.localStorageService.get(this.storageKey) || []);
    this.data$ = this.dataSubject.asObservable();

    this.data$.pipe(skip(1)).subscribe(data => this.localStorageService.add(this.storageKey, data));
  }

  populate(entities: T[]): void{
    this.dataSubject.next(entities);
  }

  get$(id: number): Observable<T>{
    return this.data$.pipe(map(arr => arr.find(e => e.id == id)));
  }

  getAll(): T[]{
    return this.dataSubject.value;
  }

  addOrUpdate(entity: T): void{
    if(this.dataSubject.value !== null && !this.dataSubject.value.find(e => e.id == entity.id)) {
      this.dataSubject.value.unshift(entity);
      this.dataSubject.next(this.dataSubject.value);
    }
    else this.update(entity);
  }

  addOrUpdateRange(entities: T[], keepOriginals = false): void{
    let arr: T[];

    if(keepOriginals) arr = [...this.dataSubject.value, ...entities];
    else arr = [...entities, ...this.dataSubject.value];

    arr = arr.filter((entity, index, self) => index === self.findIndex((e) => (e.id === entity.id)));
    console.log(arr);
    this.dataSubject.next(arr);
  }

  update(entity: T): void{
    this.dataSubject.next(
      this.dataSubject.value.map(e => {
        if(e.id !== entity.id) return e;
        else return entity;
      })
    );
  }

  delete(id: number): void{
    this.dataSubject.next(
      this.dataSubject.value.filter(d => {
        return d.id !== id
      })
    );
  }

  isEmpty(): boolean{
    return (this.dataSubject.value === undefined || this.dataSubject.value.length == 0)
  }

}
