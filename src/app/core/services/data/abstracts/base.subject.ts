import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import { PersistentSubject } from './persistent.subject';
import { ArrayHelperService } from '../../utility/array-helper.service';

export abstract class BaseSubject<T> extends PersistentSubject<T[]>{

  constructor( 
    readonly entityIdentifier: string,
    protected arrayHelperService: ArrayHelperService,  
    localStorageService?: LocalStorageService,
    storageKey?:string,) {

    super(localStorageService, storageKey);
  }

  populate = (arr: T[]) => this.dataSubject.next(arr);

  getAll$ (): Observable<T[]> {
    return this.data$.pipe(map(arr => !arr ? [] : arr.slice()));
  }

  getAll (): T[]{  
    return this.dataSubject.value.slice();
  }
  
  getAllDetails$(): Observable<T[]>{
    return this.getAll$();
  }
  
  get$(id: any): Observable<T>{
    return this.data$.pipe(map(arr => this.arrayHelperService.find(arr, id, this.entityIdentifier)));
  }

  getRange$(ids: any[]): Observable<T[]>{
    return this.data$.pipe(map(arr => this.arrayHelperService.getRangeByIdentifier(arr, ids, this.entityIdentifier)));
  }
  
  getBy$(expression: (value: T, index?: number, Array?: any[]) => boolean): Observable<T[]>{
    return this.data$.pipe(map(arr => this.arrayHelperService.filter(arr, expression)));
  }

  addOrUpdate(entity: T): void{
    if(this.dataSubject.value && !this.dataSubject.value.find(e => e[this.entityIdentifier] == entity[this.entityIdentifier])) {
      let arr = this.arrayHelperService.add<T>(this.dataSubject.value, entity);
      this.dataSubject.next(arr);
    }
    else this.update(entity);
  }

  addOrUpdateRange(entities: T[]): void{
    let arr = this.arrayHelperService.addOrUpdateRange<T>(this.dataSubject.value, entities, this.entityIdentifier)
    this.dataSubject.next(arr);
  }

  update(entity: T): void{
    let arr = this.arrayHelperService.update<T>(this.dataSubject.value, entity, this.entityIdentifier);
    this.dataSubject.next(arr);
  }

  delete(id: any): void{
    let arr = this.arrayHelperService.removeByIdentifier(this.dataSubject.value, id, this.entityIdentifier)
    this.dataSubject.next(arr);
  }

  deleteRange(ids: any[]){
    let arr = this.arrayHelperService.removeRangeByIdentifier<T>(this.dataSubject.value, ids, this.entityIdentifier);
    this.dataSubject.next(arr);
  }

  purge = (): void => this.dataSubject.next([]);
  
  get isEmpty(): boolean{
    return (this.dataSubject.value === undefined || this.dataSubject.value.length == 0)
  }

}
