import { Injectable } from '@angular/core';
import { BaseEntity  } from 'src/app/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BaseSubject<T extends BaseEntity> {

  private _dataSubject = new BehaviorSubject<T[]>([]);

  public data$ = this._dataSubject.asObservable();

  constructor() {}

  populate(entities: T[]){
    this._dataSubject.next(entities);
  }

  get$(id: number): Observable<T>{
    return this.data$.pipe(map(arr => arr.find(e => e.id == id)));
  }

  add(entity: T){
    if(!this._dataSubject.value.find(e => e.id == entity.id)) //Only add if ID doesnt exist
      this._dataSubject.value.push(entity);
  }

  update(entity: T){
    this._dataSubject.next(
      this._dataSubject.value.map(e => {
        if(e.id !== entity.id) return e;
        else return entity;
      })
    );
  }

  delete(id: number){
    this._dataSubject.next(
      this._dataSubject.value.filter(d => {
        return d.id !== id
      })
    );
  }

  isEmpty(): boolean{
    return (this._dataSubject.value === undefined || this._dataSubject.value.length == 0)
  }

}
