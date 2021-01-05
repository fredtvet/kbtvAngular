import { Directive, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Maybe } from 'global-types';
import { SelectableListComponent } from 'selectable-list';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Directive()
export abstract class SelectableListContainerComponent implements OnInit {
    @ViewChild('selectableList') selectableList: SelectableListComponent;

    private currentFabsSubject: BehaviorSubject<Maybe<AppButton[]>> = new BehaviorSubject(null);
    currentFabs$: Observable<Maybe<AppButton[]>> = this.currentFabsSubject.asObservable();

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
