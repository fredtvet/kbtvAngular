import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { _trackById } from 'src/app/shared-app/helpers/trackby/track-by-id.helper';
import { AppButton } from 'src/app/shared-app/interfaces/app-button.interface';
import { _trackByAppButton } from 'src/app/shared-app/track-by-app-button';
@Component({
  selector: 'app-main-skeleton',
  templateUrl: './main-skeleton.component.html', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSkeletonComponent{
  ButtonTypes = ButtonTypes;

  @HostBinding('class.overlay-page') @Input() overlayMode: boolean;
  @Input() fabs: AppButton[];
  @Input() disableElevation: boolean;

  constructor(){ }

  trackByFab = _trackByAppButton;

  trackByChipRow = _trackById;

}
