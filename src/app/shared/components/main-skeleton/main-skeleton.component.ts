import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces/app-button.interface';
import { _trackByAppButton } from 'src/app/shared-app/track-by-app-button';
import { _trackById } from '../../trackby/track-by-id.helper';

@Component({
  selector: 'app-main-skeleton',
  templateUrl: './main-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSkeletonComponent{
  ButtonTypes = ButtonTypes;

  @Input() fabs: AppButton[];
  @Input() disableElevation: boolean;


  trackByFab = _trackByAppButton;

  trackByChipRow = _trackById
}
