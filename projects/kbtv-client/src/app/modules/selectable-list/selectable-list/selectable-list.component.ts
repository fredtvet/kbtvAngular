import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { skip, takeUntil } from "rxjs/operators";
import { SelectableListPresenter } from './selectable-list.presenter';
import { UnknownState } from "global-types";
import { SelectableEntity } from "../interfaces";
import { Subject } from "rxjs";

@Component({
  selector: 'app-selectable-list',
  templateUrl: './selectable-list.component.html',
  styleUrls: ['./selectable-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[SelectableListPresenter]
})
export class SelectableListComponent {
    @Input('entities')
    set entities(value: UnknownState[]) {this.selectableListPresenter.addEntities(value)}

    private _identifier: string;
    @Input('identifier') 
    set identifier(value: string) {
      this._identifier = value;
      this.selectableListPresenter.setIdentifier(value)
    }

    @Input() selectedText: string;
    @Input() selectedIcon: string;
    @Input() itemTemplate: TemplateRef<unknown>;
    @Input() totalRows: number = 2;  
    @Output() selectionChanged = new EventEmitter<unknown[]>();
    @Output() itemClicked = new EventEmitter<unknown>();
  
    selectableEntities$ = this.selectableListPresenter.selectableEntities$;

    clickDisabled: boolean = false;
    
    unsubscribe : Subject<void> = new Subject();

    constructor(private selectableListPresenter: SelectableListPresenter) {}
    
    ngOnInit(): void {
        this.selectableListPresenter.selectedIds$.pipe(
            skip(1),
            takeUntil(this.unsubscribe)
        ).subscribe(x => this.selectionChanged.emit(x))
    }

    onItemClick = (item: UnknownState): void => {
      if(this.clickDisabled || this.selectableListPresenter.isEntitySelected(item[this._identifier] || item))
        return;
  
      this.itemClicked.emit(item)
    }

    toggleSelect(selectable: SelectableEntity<UnknownState>) {
      this.clickDisabled = true;
      this.selectableListPresenter.toggleEntity(selectable.entity[this._identifier] || selectable.entity)
      setTimeout(() => (this.clickDisabled = false), 500);
    }

    trackByFn = (index: number, selectable: SelectableEntity<UnknownState>): unknown => 
      selectable.entity[this._identifier];
    
    clearSelections = () => this.selectableListPresenter.addSelections([]);
    

    ngOnDestroy(){
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }
  
  }
  