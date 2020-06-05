import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersistentSubject } from '../abstracts/persistent.subject';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class RoleSubject extends PersistentSubject<string[]> {

  constructor(localStorageService: LocalStorageService) {
    super(localStorageService, 'roles');
  }

  populate = (arr: string[]) => this.dataSubject.next(arr)

  getAll$(): Observable<string[]>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? [] : arr}));
  }


}
