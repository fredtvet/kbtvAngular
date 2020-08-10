import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Roles } from 'src/app/shared-app/enums';
import { MissionDetailsViewModel } from '../mission-details-view-model.interface';

@Component({
  selector: 'app-mission-details-view',
  templateUrl: './mission-details-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDetailsViewComponent {

  public Roles = Roles;

  @Input() vm: MissionDetailsViewModel;

  constructor() { }
}
