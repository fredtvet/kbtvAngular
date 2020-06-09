import { DbSync  } from 'src/app/shared/interfaces';
import { BaseEntity } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import { PersistentSubject } from './persistent.subject';
import { ArrayHelperService } from '../../utility/array-helper.service';

export abstract class BaseSubject<T extends BaseEntity> extends PersistentSubject<T[]>{

  private timestampKey: string;

  constructor(
    private arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,
    storageKey:string) {
    super(localStorageService, storageKey);
    this.timestampKey = this.storageKey.concat('/timestamp');
  }

  sync(dbSync: DbSync<T>){

    let arr = this.arrayHelperService.addOrUpdateRange<T>(this.dataSubject.value, dbSync.entities, 'id');

    arr = this.arrayHelperService.removeRangeByIdentifier<T>(arr, dbSync.deletedEntities, 'id');

    this.dataSubject.next(arr);

    this.localStorageService.add(this.timestampKey, dbSync.timestamp)//Persist timestamp for next sync
  }

  getAll$(): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return !arr ? [] : arr.slice()}));
  }

  getAll(): T[]{
    return [...this.dataSubject.value]
  }

  getAllDetails$(): Observable<T[]>{
    return this.getAll$();
  }

  get$(id: number): Observable<T>{
    return this.data$.pipe(map(arr =>
      {return !arr ? undefined : arr.find(e => e.id == id)}));
  }

  getRange$(ids: number[]): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return !arr ? undefined : arr.filter(d => ids.includes(d.id))}));
  }

  getBy$(expression: (value: T, index?: number, Array?: any[]) => boolean): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return !arr ? undefined : arr.filter(expression)}));
  }

  addOrUpdate(entity: T): void{
    if(this.dataSubject.value && !this.dataSubject.value.find(e => e.id == entity.id)) {
      const arr = [entity, ...this.dataSubject.value]
      this.dataSubject.next(arr);
    }
    else this.update(entity);
  }

  addOrUpdateRange(entities: T[]): void{
    let arr = this.arrayHelperService.addOrUpdateRange<T>(this.dataSubject.value, entities, 'id')
    this.dataSubject.next(arr);
  }

  update(entity: T): void{
    let arr = this.dataSubject.value.slice();
    for(let i = 0; i < arr.length; i++){
      let obj = arr[i];
      if(obj.id === entity.id){
        arr[i] = {...Object.assign(obj, entity)};
        break;
      }
    }
    this.dataSubject.next(arr);
  }

  delete(id: number): void{
    let arr = this.dataSubject.value.slice();
    arr = arr.filter(d => d.id != id);
    this.dataSubject.next(arr);
  }

  deleteRange(ids: number[]){
    let arr = this.arrayHelperService.removeRangeByIdentifier<T>(this.dataSubject.value, ids, 'id');
    this.dataSubject.next(arr);
  }

  purge(){
    this.dataSubject.next([]);
    this.localStorageService.add(this.timestampKey, null)
  }

  getTimestamp(): number{
    return this.localStorageService.get(this.timestampKey);
  }

  get isEmpty(): boolean{
    return (this.dataSubject.value === undefined || this.dataSubject.value.length == 0)
  }

}
