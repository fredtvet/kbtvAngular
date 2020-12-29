import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImmutableArray, UnknownState } from "global-types";
import { SelectableEntity } from "../interfaces";

@Injectable()
export class SelectableListPresenter<T extends UnknownState = UnknownState> {

    private selectedIdsSubject = new BehaviorSubject<unknown[]>([]);
    selectedIds$ = this.selectedIdsSubject.asObservable();

    private entitiesSubject =  new BehaviorSubject<ImmutableArray<T>>([]);
    private entities$ = this.entitiesSubject.asObservable();

    selectableEntities$: Observable<SelectableEntity<T>[]> = combineLatest([this.entities$, this.selectedIds$]).pipe(
        map(([entities, selectedIds]) => this.getSelectableEntities(entities, selectedIds))
    )

    private identifier: string; 

    constructor(){}
    
    get entities(){
        return [...this.entitiesSubject.value]
    }

    setIdentifier(identifier: string){ this.identifier = identifier; }

    addEntities(entities: ImmutableArray<T>){
        this.entitiesSubject.next(entities);
    }

    addSelections(ids: unknown[]){
        this.selectedIdsSubject.next(ids);
    }

    toggleEntity(id: unknown){
        let ids = [...this.selectedIdsSubject.value];
        let index = ids.findIndex(x => x == id);
        if(index == -1) ids.push(id); //if not selected
        else ids.splice(index, 1);
        this.selectedIdsSubject.next(ids);
    }

    isEntitySelected = (id: unknown) => this.selectedIdsSubject.value.indexOf(id) !== -1;
    
    private getSelectableEntities(entities: ImmutableArray<T>, selectedIds: unknown[]): SelectableEntity<T>[]{
        let result = [];
        for(let i = 0; i < entities.length; i++){
            const id = entities[i][this.identifier];
            let isSelected = selectedIds.indexOf(id) !== -1;
            result.push({entity: entities[i], selected:isSelected})
        }
        return result;
    }
}