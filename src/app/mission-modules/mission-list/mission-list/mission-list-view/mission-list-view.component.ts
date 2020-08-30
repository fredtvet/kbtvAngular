import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Mission } from 'src/app/core/models';
import { Roles } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionListViewComponent {
  Roles = Roles;
  
  @Input() missions: Mission[] = [];

  constructor() { }
  
  trackByFn = (index: number, mission: Mission) => mission.id;
}
