import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models';
import { PersistentSubject } from './persistent.subject';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class RolesSubject extends PersistentSubject<string[]> {

  constructor(localStorageService: LocalStorageService) {
    super(localStorageService, 'roles');
  }

  populate = (arr: string[]) => this.dataSubject.next(arr)

  getAll$(): Observable<string[]>{
    return this.data$.pipe(map(arr =>
      {return arr === undefined ? [] : arr}));
  }


}
