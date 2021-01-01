import { Injectable } from '@angular/core';
import { get, set, Store as DbStore } from 'idb-keyval';
import { from, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StateDbService {

    private dbStore: DbStore = new DbStore("kbtvDb", "state");

    constructor() { }

    set<T>(property: string, payload: T): void{
        from(set(property, payload, this.dbStore))
            .subscribe(() => {}, err => console.log(err))
    }

    get$<T>(property: string): Observable<T>{
        return from(get<T>(property, this.dbStore))
    }

}



