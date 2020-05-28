import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { Mission, MissionNote, MissionImage, MissionReport } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/shared/enums';
import { filter } from 'rxjs/operators';
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
