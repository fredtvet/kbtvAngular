import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectableEntity } from 'src/app/shared/interfaces';

@Injectable()
export class SelectableListPresenter<T> {

    private selectedIdsSubject = new BehaviorSubject<any[]>([]);
    selectedIds$ = this.selectedIdsSubject.asObservable();

    private entitiesSubject =  new BehaviorSubject<T[]>([]);
    private entities$ = this.entitiesSubject.asObservable();

    selectableEntities$: Observable<SelectableEntity<T>[]> = combineLatest([this.entities$, this.selectedIds$]).pipe(
        map(([entities, selectedIds]) => this.getSelectableEntities(entities, selectedIds))
    )

    private identifier:string; 

    constructor(){}
    
    get entities(){
        return [...this.entitiesSubject.value]
    }

    setIdentifier(identifier: string){ this.identifier = identifier; }

    addEntities(entities: T[]){
        this.entitiesSubject.next(entities);
    }

    addSelections(ids: any[]){
        this.selectedIdsSubject.next(ids);
    }

    toggleEntity(id: any){
        let ids = [...this.selectedIdsSubject.value];
        let index = ids.findIndex(x => x == id);
        if(index == -1) ids.push(id); //if not selected
        else ids.splice(index, 1);
        this.selectedIdsSubject.next(ids);
    }

    isEntitySelected = (id:any) => this.selectedIdsSubject.value.includes(id);
    
    private getSelectableEntities(entities:T[], selectedIds:any[]): SelectableEntity<T>[]{
        let result = [];
        for(let i = 0; i < entities.length; i++){
            let isSelected = selectedIds.includes(entities[i][this.identifier]);
            result.push({entity: entities[i], selected:isSelected})
        }
        return result;
    }
}