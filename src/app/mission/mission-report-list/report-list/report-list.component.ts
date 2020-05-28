import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { SelectableListBase } from '../../components/selectable-list/selectable-list.base';
import { MissionReport } from 'src/app/shared/models';
import { SelectableListPresenter } from '../../components/selectable-list/selectable-list.presenter';
import { SelectableEntity } from 'src/app/shared/interfaces';

@Component({
  providers: [SelectableListPresenter],
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})

export class ReportListComponent extends SelectableListBase<MissionReport>{
  @Input() totalRows: number = 2;  
  @Output() reportClicked = new EventEmitter<MissionReport>();

  private clickDisabled: boolean;

  constructor(selectableListPresenter: SelectableListPresenter<MissionReport>) {
    super(selectableListPresenter);
  }

  toggleSelect(selectable: SelectableEntity<MissionReport>) {
    this.clickDisabled = true;
    super.toggleSelect(selectable);
    setTimeout(() => (this.clickDisabled = false), 500);
  }

  reportClick(report: MissionReport){
    if (this.clickDisabled || this.selectableListPresenter.isEntitySelected(report.id))
      return undefined;
    this.reportClicked.emit(report);
  }
  
  trackById(index: number, selectable: SelectableEntity<MissionReport>): number {
    return selectable.entity.id;
  }
}
