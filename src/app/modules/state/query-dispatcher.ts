import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Query { props: string[] };

@Injectable({providedIn: "root"})
export class QueryDispatcher {

    constructor(){}

    private querySubject = new Subject<Query>();
    queries$ = this.querySubject.asObservable();

    dispatch = (query: Query) =>
        this.querySubject.next(query);
    
}