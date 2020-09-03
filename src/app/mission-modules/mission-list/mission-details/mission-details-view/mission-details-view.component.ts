import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RolePresets } from 'src/app/shared-app/enums';
import { MissionDetails } from '../../interfaces/mission-details.interface';
import { Mission } from 'src/app/core/models';

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