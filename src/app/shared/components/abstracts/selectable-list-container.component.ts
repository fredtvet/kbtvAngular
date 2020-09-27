import { Directive, ViewChild } from '@angular/core';
import { MainNavService } from 'src/app/layout';
import { AppButton } from 'src/app/shared-app/interfaces';
import { SelectableListComponent } from '../selectable-list/selectable-list.component';

@Directive()
export abstract class SelectableListContainerComponent {
    @ViewChild('selectableList') selectableList: SelectableListComponent;

    protected staticFabs: AppButton[];
    protected selectedItemsFabs: AppButton[];
    protected currentSelections: string[] = [];

    constructor(protected mainNavService: MainNavService) {}

    onSelectionChange(selections: string[]): void{
        if(!selections) return;
        this.currentSelections = selections;
        this.updateFabs();
    }

    private updateFabs(){
        let fabs = this.mainNavService.currentFabs;
        let totalFabCount = this.staticFabs.length + this.selectedItemsFabs.length;

        if(this.currentSelections.length === 0 && fabs.length === totalFabCount) //If no selections remove fabs if existing
        this.mainNavService.removeFabsByCallback(this.selectedItemsFabs.map(x => x.callback))
        else if (this.currentSelections.length > 0 && fabs.length === this.staticFabs.length)
        this.mainNavService.updateConfig(
            {fabs: this.mainNavService.getFabs().concat(this.selectedItemsFabs)}
        );
    }

}
