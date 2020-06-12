import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { BaseEntity } from '../../interfaces/models/base-entity.interface';
import { SelectableEntity } from '../../interfaces/selectable-entity.interface';

@Injectable()
export class SelectableListPresenter<T extends BaseEntity> extends SubscriptionComponent{

    private selectedIdsSubject = new BehaviorSubject<number[]>([]);
    selectedIds$ = this.selectedIdsSubject.asObservable();

    private entitiesSubject =  new BehaviorSubject<T[]>([]);
    private entities$ = this.entitiesSubject.asObservable();

    selectableEntities$: Observable<SelectableEntity<T>[]> = combineLatest(this.entities$, this.selectedIds$).pipe(
        map(([entities, selectedIds]) => this.getSelectableEntities(entities, selectedIds))
    )

    constructor(){super()}
    
    get entities(){
        return [...this.entitiesSubject.value]
    }

    addEntities(entities: T[]){
        this.entitiesSubject.next(entities);
    }

    addSelections(ids: number[]){
        this.selectedIdsSubject.next(ids);
    }

    toggleEntity(id: number){
        let ids = [...this.selectedIdsSubject.value];
        let index = ids.findIndex(x => x == id);
        if(index == -1) ids.push(id); //if not selected
        else ids.splice(index, 1);
        this.selectedIdsSubject.next(ids);
    }

    isEntitySelected = (id:number) => this.selectedIdsSubject.value.includes(id);
    
    private getSelectableEntities(entities:T[], selectedIds:number[]): SelectableEntity<T>[]{
        let result = [];
        for(let i = 0; i < entities.length; i++){
            let isSelected = selectedIds.includes(entities[i].id);
            result.push({entity: entities[i], selected:isSelected})
        }
        return result;
    }
}