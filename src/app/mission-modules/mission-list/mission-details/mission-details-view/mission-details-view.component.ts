import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Mission } from 'src/app/core/models';
import { RolePresets } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-mission-details-view',
  templateUrl: './mission-details-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDetailsViewComponent {

  RolePresets = RolePresets;

  @Input() mission: Mission;

  constructor() { }
  
}