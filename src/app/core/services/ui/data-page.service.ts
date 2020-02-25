import { Injectable } from '@angular/core';
import { fromEvent, of, Observable, merge, Observer, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataPageService {

  public currentTable: string;

  constructor() { }

}
