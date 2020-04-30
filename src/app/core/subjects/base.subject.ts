import { DbSync  } from 'src/app/shared/interfaces';
import { BaseEntity } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    let arr = this._addOrUpdateRange(dbSync.entities) //Add new or updated entities
    arr = arr.filter(d => !dbSync.deletedEntities.includes(d.id)) //Remove deleted entities
    this.dataSubject.next(arr);
    this.localStorageService.add(this.timestampKey, dbSync.timestamp)//Persist timestamp for next sync 
  }

  getAll$(): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? [] : arr}));
  }

  getAllDetails$(): Observable<T[]>{
    return this.getAll$();
  }

  get$(id: number): Observable<T>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? undefined : arr.find(e => e.id == id)}));
  }

  getRange$(ids: number[]): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? undefined : arr.filter(d => ids.includes(d.id))}));
  }

  getBy$(expression: (value: T, index?: number, Array?: any[]) => boolean): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? undefined : arr.filter(expression)}));
  }

  addOrUpdate(entity: T): void{
    if(this.dataSubject.value !== undefined && !this.dataSubject.value.find(e => e.id == entity.id)) {
      const arr = [entity, ...this.dataSubject.value]
      this.dataSubject.next(arr);
    }
    else this.update(entity);
  }

  addOrUpdateRange(entities: T[]): void{
    let arr = this._addOrUpdateRange(entities)
    this.dataSubject.next(arr);
  }

  update(entity: T): void{
    let arr = [...this.dataSubject.value];
    arr = arr.map(e => {
      if(e.id !== entity.id) return e;
      else return Object.assign(e, entity);
    });
    this.dataSubject.next(arr);
  }

  delete(id: number): void{
    let arr = [...this.dataSubject.value];
    arr = arr.filter(d => d.id != id);
    this.dataSubject.next(arr);
  }

  deleteRange(ids: number[]){
    let arr = [...this.dataSubject.value];
    arr = arr.filter(d => !ids.includes(d.id));
    this.dataSubject.next(arr);
  }

  purge(){
    this.dataSubject.next([]);
    this.localStorageService.add(this.timestampKey, null)
  }

  getTimestamp(): string{
    return this.localStorageService.get(this.timestampKey);
  }

  get isEmpty(): boolean{
    return (this.dataSubject.value === undefined || this.dataSubject.value.length == 0)
  }

  private _addOrUpdateRange(entities: T[]): T[]{
    let originals = this.dataSubject.value || [];
    originals = [...originals];
    entities.forEach(e => {
      let duplicateIndex = originals.findIndex((o) => (o.id === e.id));
      if(duplicateIndex !== -1) originals[duplicateIndex] = Object.assign(originals[duplicateIndex], e);
      else originals.push(e);
    });

    return originals;
  }

}
