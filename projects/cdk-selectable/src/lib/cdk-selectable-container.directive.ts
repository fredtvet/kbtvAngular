import { Directive, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { SelectedMap } from "./interfaces";
import { CdkSelectablePresenter } from "./cdk-selectable.presenter";

@Directive({selector: '[cdkSelectableContainer]', providers: [CdkSelectablePresenter]})
export class CdkSelectableContainerDirective {
    
    @Output() selectionChanged = new EventEmitter<(string | number)[]>();

    private mapSub: Subscription;

    constructor(private presenter: CdkSelectablePresenter){
        this.mapSub = this.presenter.selectedMap$.subscribe(x => 
            this.selectionChanged.next(this._getSelectedIds(x))
        )
    }
    
    getSelectedIds = () => this._getSelectedIds(this.presenter.selectedMap);

    resetSelections = (): void => this.presenter.resetSelections()
    
    ngOnDestroy(): void {
        this.mapSub?.unsubscribe()
    }

    private _getSelectedIds(map: SelectedMap): (string | number)[]{
        const ids = [];
        for(const key in map){
            const val = map[key];
            if(val !== undefined && val.selected === true) ids.push(key) 
        }
        return ids;
    }
}