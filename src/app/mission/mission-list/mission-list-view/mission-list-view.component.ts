import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Mission } from 'src/app/shared/interfaces/models';
import { Roles } from 'src/app/shared/enums';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MissionFormSheetWrapperComponent } from '../../components/mission-form/mission-form-sheet-wrapper.component';
import { listAnimation } from 'src/app/shared/animations/list.animation';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html',
  animations: [listAnimation],
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

  trackByFn = (index: number, mission: Mission) => {return mission.id};

}
