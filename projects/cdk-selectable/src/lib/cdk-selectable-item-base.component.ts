import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IdSelectPair } from './interfaces';
import { CdkSelectablePresenter } from './cdk-selectable.presenter';

@Directive()
export abstract class CdkSelectableItemBaseComponent {

  @Input() defaultState: boolean = false;

  private _id: string | number;
  @Input('id') 
  set id(value: string | number) {
    this._id = value;
    this.presenter.addEntry(this.id, this.defaultState)
  }

  get id(): string | number { return this._id }

  constructor(private presenter: CdkSelectablePresenter) { }
  
  isSelected$ = (id: string | number): Observable<IdSelectPair> => 
    this.presenter.isSelected$(id);

  toggleSelection = () => 
    this.presenter.updateEntry(this.id, !this.presenter.selectedMap[this.id].selected);
  
  ngOnDestroy(): void {
    this.presenter.removeEntry(this.id);
  }
  
}
