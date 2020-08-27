import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MissionType } from 'src/app/core/models';
import { DataManagementStore } from '../../data-management.store';
import { FormAction } from 'src/app/shared/enums';

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

  constructor(private store: DataManagementStore) { }

  onSubmit = (missionType: MissionType) => {
    if(!missionType) this.finished.emit();
    else this.store.add$(missionType).subscribe(x => this.finished.emit(FormAction.Create));
  }
}
