import { Directive, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppButton } from '@shared-app/interfaces';
import { SelectableListComponent } from '../selectable-list/selectable-list.component';

@Directive()
export abstract class SelectableListContainerComponent implements OnInit {
    @ViewChild('selectableList') selectableList: SelectableListComponent;

    private currentFabsSubject = new BehaviorSubject(null);
    currentFabs$: Observable<AppButton[]> = this.currentFabsSubject.asObservable();

    protected staticFabs: AppButton[];
    protected selectedItemsFabs: AppButton[];

    protected currentSelections: string[] = [];

    ngOnInit() { this.currentFabsSubject.next(this.staticFabs) }

    onSelectionChange(selections: string[]): void{
        if(!selections) return;
        this.currentSelections = selections;
        this.updateFabs();
    }

    private updateFabs(){
        let fabs = this.staticFabs;

        if(this.currentSelections.length > 0) 
            fabs = [...this.staticFabs, ...this.selectedItemsFabs]

        this.currentFabsSubject.next(fabs);
    }

}
