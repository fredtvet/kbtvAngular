import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { MissionType } from 'src/app/core/models';
import { MissionTypeService } from 'src/app/core/services';

@Component({
  selector: 'app-mission-type-form',
  templateUrl: './mission-type-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionTypeFormComponent implements OnInit {
  
  @Output() finished = new EventEmitter();

  constructor(private missionTypeService:MissionTypeService) { }

  ngOnInit() {
  }

  onSubmit = (missionType: MissionType) => {
    if(!missionType) this.finished.emit();
    else this.missionTypeService.add$(missionType).subscribe(x => this.finished.emit(x));
  }
}
