import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Mission } from 'src/app/shared/models';
import { Roles } from 'src/app/shared/enums';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MissionFormSheetWrapperComponent } from '../../components/mission-form/mission-form-sheet-wrapper.component';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionListViewComponent implements OnInit {
  Roles = Roles;
  
  @Input() missions: Mission[] = [];
  @Input() title: string = "Oppdrag";
  @Output() search = new EventEmitter();

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit() { }

  onSearch = (val: string) => this.search.emit(val);

  openMissionForm = () => this._bottomSheet.open(MissionFormSheetWrapperComponent);

}
