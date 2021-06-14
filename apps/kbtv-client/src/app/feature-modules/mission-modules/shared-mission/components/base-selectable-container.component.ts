import { Directive, ViewChild } from '@angular/core';
import { CdkSelectableContainerDirective } from 'cdk-selectable';
import { BehaviorSubject, Observable } from 'rxjs';

@Directive()
export abstract class BaseSelectableContainerComponent  {
    @ViewChild('selectableContainer', {read: CdkSelectableContainerDirective}) 
    selectableContainer: CdkSelectableContainerDirective;

    private currentSelectionsSubject: BehaviorSubject<string[]> = 
        new BehaviorSubject([]);

    currentSelections$: Observable<string[]> = 
        this.currentSelectionsSubject.asObservable();

    get currentSelections(): string[] { return this.currentSelectionsSubject.value };

    onSelectionChange(selections: string[]): void{
        if(!selections) return;
        this.currentSelectionsSubject.next(selections)
    }

    resetSelections = (): void => {
        this.selectableContainer.resetSelections();
        this.currentSelectionsSubject.next([]);  
    }
}
