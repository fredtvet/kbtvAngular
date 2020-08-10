import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { MissionDocument } from 'src/app/core/models';
import { SelectableEntity } from 'src/app/shared-app/interfaces';
import { SelectableListPresenter, SelectableListBase } from 'src/app/shared/components';

@Component({
  providers: [SelectableListPresenter],
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
