import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces/app-button.interface';
import { TrackByAppButton } from 'src/app/shared-app/track-by-app-button';
import { _trackById } from '../../trackby/track-by-id.helper';

@Component({
  selector: 'app-main-skeleton',
  templateUrl: './main-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[MatBottomSheet]
})
export class MainSkeletonComponent{
  ButtonTypes = ButtonTypes;

  @Input() fabs: AppButton[];
  @Input() disableElevation: boolean;


  trackByFab = TrackByAppButton;

  trackByChipRow = _trackById
}
