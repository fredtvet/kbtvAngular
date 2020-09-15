import { Input, EventEmitter, Output, Directive } from "@angular/core";
import { skip, takeUntil } from "rxjs/operators";
import { SelectableListPresenter } from './selectable-list.presenter';
import { SubscriptionComponent } from '../../../shared-app/components/subscription.component';
import { SelectableEntity } from 'src/app/shared/interfaces';

@Directive()
export abstract class SelectableListBase<T> extends SubscriptionComponent {
    @Input('entities')
    set entities(value: T[]) {this.selectableListPresenter.addEntities(value)}
  
    @Output() selectionChanged = new EventEmitter<string[]>();
  
    selectableEntities$ = this.selectableListPresenter.selectableEntities$;
    private identfier = "id"; //Add config injector?
    constructor(protected selectableListPresenter: SelectableListPresenter<T>) {super();}
    
    ngOnInit(): void {
        this.selectableListPresenter.selectedIds$.pipe(
            skip(1),
            takeUntil(this.unsubscribe)
        ).subscribe(x => this.selectionChanged.emit(x))
    }
  
    toggleSelect(selectable: SelectableEntity<T>) {
      this.selectableListPresenter.toggleEntity(selectable.entity[this.identfier])
    }
  
    clearSelections = () => this.selectableListPresenter.addSelections([]);
  
  }
  