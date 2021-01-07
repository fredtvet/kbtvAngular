import { Directive, OnInit, ViewChild } from '@angular/core';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { CdkSelectableContainerDirective } from 'cdk-selectable';
import { Maybe } from 'global-types';
import { BehaviorSubject, Observable } from 'rxjs';

@Directive()
export abstract class SelectableContainerWrapperComponent implements OnInit {
    @ViewChild('selectableContainer', {read: CdkSelectableContainerDirective}) 
    selectableContainer: CdkSelectableContainerDirective;

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
