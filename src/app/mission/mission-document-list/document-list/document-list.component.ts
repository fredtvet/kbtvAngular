import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SelectableListBase } from '../../components/selectable-list/selectable-list.base';
import { MissionDocument } from 'src/app/shared/models';
import { SelectableListPresenter } from '../../components/selectable-list/selectable-list.presenter';
import { SelectableEntity } from 'src/app/shared/interfaces';

@Component({
  providers: [SelectableListPresenter],
  selector: 'app-document-list',
  templateUrl: './document-list.component.html'
})

export class DocumentListComponent extends SelectableListBase<MissionDocument>{
  @Input() totalRows: number = 2;  
  @Output() documentClicked = new EventEmitter<MissionDocument>();

  private clickDisabled: boolean;

  constructor(selectableListPresenter: SelectableListPresenter<MissionDocument>) {
    super(selectableListPresenter);
  }

  toggleSelect(selectable: SelectableEntity<MissionDocument>) {
    this.clickDisabled = true;
    super.toggleSelect(selectable);
    setTimeout(() => (this.clickDisabled = false), 500);
  }

  documentClick(document: MissionDocument){
    if (this.clickDisabled || this.selectableListPresenter.isEntitySelected(document.id))
      return undefined;
    this.documentClicked.emit(document);
  }
  
  trackById(index: number, selectable: SelectableEntity<MissionDocument>): number {
    return selectable.entity.id;
  }
}
