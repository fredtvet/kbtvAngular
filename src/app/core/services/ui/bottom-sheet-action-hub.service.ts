import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavAction } from 'src/app/shared/components';

@Injectable({
  providedIn: 'root'
})

export class BottomSheetActionHubService {

  private eventHubSubject: Subject<NavAction> = new Subject();

  eventHub$: Observable<NavAction> = this.eventHubSubject.asObservable();

  constructor() { }

  addAction(action: NavAction){
    this.eventHubSubject.next(action);
  }
}
