import { DbSync  } from 'src/app/shared-app/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import { PersistentSubject } from './persistent.subject';
import { ArrayHelperService } from '../../utility/array-helper.service';
import { BaseEntity } from 'src/app/core/models/base-entity.interface';

export abstract class BaseSubject<T extends BaseEntity> extends PersistentSubject<T[]>{

  private timestampKey: string;
  lastSyncTimestamp: number;

  constructor(
    protected arrayHelperService: ArrayHelperService,
    localStorageService: LocalStorageService,
    storageKey:string) {

    super(localStorageService, storageKey);
    this.timestampKey = this.storageKey.concat('/timestamp');
    this.lastSyncTimestamp = this.localStorageService.get(this.timestampKey);

  }

  sync(dbSync: DbSync<T>){
    let arr = this.arrayHelperService.addOrUpdateRange<T>(this.dataSubject.value, dbSync.entities, 'id');
    arr = this.arrayHelperService.removeRangeByIdentifier<T>(arr, dbSync.deletedEntities, 'id');
    this.dataSubject.next(arr);

    this.lastSyncTimestamp = dbSync.timestamp;
    this.localStorageService.add(this.timestampKey, dbSync.timestamp)//Persist timestamp for next sync

  }

  getAll$ (): Observable<T[]> {
    return this.data$.pipe(map(arr => !arr ? [] : arr.slice()));
  }

  getAll (): T[]{  
    return this.dataSubject.value.slice();
  }
  
  getAllDetails$(): Observable<T[]>{
    return this.getAll$();
  }
  
  get$(id: number): Observable<T>{
    return this.data$.pipe(map(arr => this.arrayHelperService.find(arr, id, 'id')));
  }

  getRange$(ids: number[]): Observable<T[]>{
    return this.data$.pipe(map(arr => this.arrayHelperService.getRangeByIdentifier(arr, ids, 'id')));
  }
  
  getBy$(expression: (value: T, index?: number, Array?: any[]) => boolean): Observable<T[]>{
    return this.data$.pipe(map(arr =>
      {return !arr ? undefined : arr.filter(expression)}));
  }

  addOrUpdate(entity: T): void{
    if(this.dataSubject.value && !this.dataSubject.value.find(e => e.id == entity.id)) {
      let arr = this.arrayHelperService.add<T>(this.dataSubject.value, entity);
      this.dataSubject.next(arr);
    }
    else this.update(entity);
  }

  addOrUpdateRange(entities: T[]): void{
    let arr = this.arrayHelperService.addOrUpdateRange<T>(this.dataSubject.value, entities, 'id')
    this.dataSubject.next(arr);
  }

  update(entity: T): void{
    let arr = this.arrayHelperService.update<T>(this.dataSubject.value, entity, 'id');
    this.dataSubject.next(arr);
  }

  delete(id: number): void{
    let arr = this.arrayHelperService.removeByIdentifier(this.dataSubject.value, id, 'id')
    this.dataSubject.next(arr);
  }

  deleteRange(ids: number[]){
    let arr = this.arrayHelperService.removeRangeByIdentifier<T>(this.dataSubject.value, ids, 'id');
    this.dataSubject.next(arr);
  }

  purge(){
    this.dataSubject.next([]);
    this.localStorageService.add(this.timestampKey, null);
    this.lastSyncTimestamp = null;
  }

  get isEmpty(): boolean{
    return (this.dataSubject.value === undefined || this.dataSubject.value.length == 0)
  }

}
