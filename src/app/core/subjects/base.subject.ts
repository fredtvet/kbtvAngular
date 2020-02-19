import { BaseEntity, DbSync  } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, skip } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

export abstract class BaseSubject<T extends BaseEntity> {

  protected dataSubject: BehaviorSubject<T[]>;

  public data$: Observable<T[]>;

  private timestampKey: string;

  constructor(
    protected localStorageService: LocalStorageService,
    private storageKey:string) {
    this.timestampKey = this.storageKey.concat('/timestamp');

    this.dataSubject = new BehaviorSubject<T[]>(this.localStorageService.get(this.storageKey) || []);
    this.data$ = this.dataSubject.asObservable();

    this.data$.pipe(skip(1)).subscribe(data => {
      this.localStorageService.add(this.storageKey, data);
    });
  }

  sync(dbSync: DbSync<T>){
    console.log(dbSync)
    let arr = this._addOrReplaceRange(dbSync.entities) //Add new or updated entities
    arr = arr.filter(d => !dbSync.deletedEntities.includes(d.id)) //Remove deleted entities
    this.dataSubject.next(arr);

    this.localStorageService.add(this.timestampKey, dbSync.timestamp)
  }

  get$(id: number): Observable<T>{
    return this.data$.pipe(map(arr => arr.find(e => e.id == id)));
  }

  addOrReplace(entity: T): void{
    if(this.dataSubject.value !== null && !this.dataSubject.value.find(e => e.id == entity.id)) {
      this.dataSubject.value.unshift(entity);
      this.dataSubject.next(this.dataSubject.value);
    }
    else this.update(entity);
  }

  addOrReplaceRange(entities: T[], keepOriginals = false): void{
    let arr = this._addOrReplaceRange(entities, keepOriginals)
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

  deleteRange(ids: number[]){
    this.dataSubject.next(
      this.dataSubject.value.filter(d => {
        return !ids.includes(d.id);
      })
    );
  }

  isEmpty(): boolean{
    return (this.dataSubject.value === undefined || this.dataSubject.value.length == 0)
  }

  purge(){
    this.dataSubject.next([]);
    this.localStorageService.add(this.timestampKey, null)
  }

  getTimestamp(): string{
    console.log(this.localStorageService.get(this.timestampKey));
    return this.localStorageService.get(this.timestampKey);
  }

  private _addOrReplaceRange(entities: T[], keepOriginals = false): T[]{
    let arr: T[];

    if(keepOriginals) arr = [...this.dataSubject.value, ...entities];
    else arr = [...entities, ...this.dataSubject.value];

    return arr.filter((entity, index, self) => index === self.findIndex((e) => (e.id === entity.id)));
  }

}
