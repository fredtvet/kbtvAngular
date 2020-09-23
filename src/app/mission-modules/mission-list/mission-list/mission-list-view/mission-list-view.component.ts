import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Mission } from 'src/app/core/models';
import { Roles } from 'src/app/shared-app/enums';
import { TrackByModel } from 'src/app/shared/trackby/track-by-model.helper';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionListViewComponent {
  Roles = Roles;
  
  @Input() missions: Mission[] = [];

  constructor() { }

  trackByFn = TrackByModel("missions");
}
