import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';
import { IdSelectPair, SelectedMap } from "./interfaces";

@Injectable()
export class CdkSelectablePresenter {

    private selectedMapSubject = new BehaviorSubject<Readonly<SelectedMap>>({})
    selectedMap$ = this.selectedMapSubject.asObservable();
    get selectedMap(): SelectedMap { return  {...this.selectedMapSubject.value} };

    constructor(){}

    isSelected$ = (id: string | number): Observable<IdSelectPair> =>
        this.selectedMap$.pipe(map(x => x[id]), distinctUntilKeyChanged<IdSelectPair>("selected"))

    updateEntry = (id: string | number, selected: boolean) => this.addEntry(id, selected)
    
    addEntry = (id: string | number, selected: boolean = false) => {
        this.selectedMapSubject.next({
            ...this.selectedMapSubject.value, 
            [id]: {id, selected: selected ? true : false}
        })
    }

    removeEntry = (id: string | number) => {
        if(!id) return;
        const copy = this.selectedMap;
        delete copy[id];
        this.selectedMapSubject.next(copy)
    }

    resetSelections(): void{
        const items = this.selectedMap;
        for(const key in items) items[key] = {...items[key], selected: false};
        this.selectedMapSubject.next(items);
    }
}