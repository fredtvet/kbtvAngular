import { Directive, ViewChild } from '@angular/core';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { CdkSelectableContainerDirective } from 'cdk-selectable';
import { Maybe } from 'global-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';

@Directive()
export abstract class BaseSelectableContainerComponent  {
    @ViewChild('selectableContainer', {read: CdkSelectableContainerDirective}) 
    selectableContainer: CdkSelectableContainerDirective;

    private selectionBarConfigSubject: BehaviorSubject<Maybe<MainTopNavConfig>> = 
        new BehaviorSubject(null);

    selectionBarConfig$: Observable<Maybe<MainTopNavConfig>> = 
        this.selectionBarConfigSubject.asObservable();

    protected selectedItemsActions: AppButton[];

    protected currentSelections: string[] = [];


    onSelectionChange(selections: string[]): void{
        if(!selections) return;
        this.currentSelections = selections;

        let selectionBarConfig: Maybe<MainTopNavConfig> = null;
        if(selections.length > 0) selectionBarConfig = {
            title: `${selections.length} element${selections.length === 1 ? '' : 'er'} valgt`,
            customCancelFn: this.resetSelections,
            buttons: this.selectedItemsActions
        }
        
        this.selectionBarConfigSubject.next(selectionBarConfig)
    }

    resetSelections = (): void => {
        this.selectableContainer.resetSelections();
        this.selectionBarConfigSubject.next(null);  
        this.currentSelections = [];
    }
}
