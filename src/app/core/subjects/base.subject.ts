import { DbSync  } from 'src/app/shared/models';
import { BaseEntity } from 'src/app/shared/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, skip, distinctUntilChanged, share, delay } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';
import { PersistentSubject } from './persistent.subject';

export abstract class BaseSubject<T extends BaseEntity> extends PersistentSubject<T[]>{

  private timestampKey: string;

  constructor(
    localStorageService: LocalStorageService,
    storageKey:string) {
    super(localStorageService, storageKey);
    this.timestampKey = this.storageKey.concat('/timestamp');
  }

  sync(dbSync: DbSync<T>){
    let arr = this._addOrReplaceRange(dbSync.entities) //Add new or updated entities
    arr = arr.filter(d => !dbSync.deletedEntities.includes(d.id)) //Remove deleted entities
    this.dataSubject.next(arr);

    this.localStorageService.add(this.timestampKey, dbSync.timestamp)
  }

  getAll$(): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? [] : arr}));
  }

  get$(id: number): Observable<T>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? undefined : arr.find(e => e.id == id)}));
  }

  getRange$(ids: number[]): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? undefined : arr.filter(d => ids.includes(d.id))}));
  }

  getByProperty(property: string, value: any){
    return this.getAll$().pipe(map(arr => arr.filter(e => e[property] == value)));
  }

  addOrReplace(entity: T): void{
    if(this.dataSubject.value !== undefined && !this.dataSubject.value.find(e => e.id == entity.id)) {
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
    this.dataSubject.next(this.dataSubject.value.filter(d => d.id != id));
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
    return this.localStorageService.get(this.timestampKey);
  }

  private _addOrReplaceRange(entities: T[], keepOriginals = false): T[]{
    let arr: T[];
    let originals = this.dataSubject.value === undefined ? [] : this.dataSubject.value;
    if(keepOriginals) arr = [...originals, ...entities];
    else arr = [...entities, ...originals];

    return arr.filter((entity, index, self) => index === self.findIndex((e) => (e.id === entity.id)));
  }

}
