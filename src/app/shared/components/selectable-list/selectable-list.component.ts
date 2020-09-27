import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { skip, takeUntil } from "rxjs/operators";
import { SelectableEntity } from 'src/app/shared/interfaces';
import { SubscriptionComponent } from '../../../shared-app/components/subscription.component';
import { SelectableListPresenter } from './selectable-list.presenter';

@Component({
  selector: 'app-selectable-list',
  templateUrl: './selectable-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[SelectableListPresenter]
})
export class SelectableListComponent extends SubscriptionComponent {
    @Input('entities')
    set entities(value: any[]) {this.selectableListPresenter.addEntities(value)}

    private _identifier: string;
    @Input('identifier') 
    set identifier(value: string) {
      this._identifier = value;
      this.selectableListPresenter.setIdentifier(value)
    }

    @Input() itemTemplate: TemplateRef<any>;
    @Input() totalRows: number = 2;  
    @Output() selectionChanged = new EventEmitter<string[]>();
    @Output() itemClicked = new EventEmitter<any>();
  
    selectableEntities$ = this.selectableListPresenter.selectableEntities$;

    clickDisabled: boolean = false;

    constructor(private selectableListPresenter: SelectableListPresenter<any>) {
      super();
    }
    
    ngOnInit(): void {
        this.selectableListPresenter.selectedIds$.pipe(
            skip(1),
            takeUntil(this.unsubscribe)
        ).subscribe(x => this.selectionChanged.emit(x))
    }

    onItemClick = (item: any): void => {
      if(this.clickDisabled || this.selectableListPresenter.isEntitySelected(item[this._identifier] || item))
        return;
  
      this.itemClicked.emit(item)
    }

    toggleSelect(selectable: SelectableEntity<any>) {
      this.clickDisabled = true;
      this.selectableListPresenter.toggleEntity(selectable.entity[this._identifier] || selectable.entity)
      setTimeout(() => (this.clickDisabled = false), 500);
    }

    trackByFn = (index: number, selectable: SelectableEntity<any>): string => 
      selectable.entity[this._identifier];
    
    clearSelections = () => this.selectableListPresenter.addSelections([]);
  
  }
  