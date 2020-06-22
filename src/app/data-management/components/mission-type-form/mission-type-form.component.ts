import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { MissionType } from 'src/app/core/models';
import { MissionTypeService } from 'src/app/core/services';

@Component({
  selector: 'app-mission-type-form',
  template: `
  <app-mission-type-form-view
    (formSubmitted)="onSubmit($event)">
  </app-mission-type-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionTypeFormComponent {
  
  @Output() finished = new EventEmitter();

  constructor(private missionTypeService:MissionTypeService) { }

  onSubmit = (missionType: MissionType) => {
    if(!missionType) this.finished.emit();
    else this.missionTypeService.add$(missionType).subscribe(x => this.finished.emit(x));
  }
}
