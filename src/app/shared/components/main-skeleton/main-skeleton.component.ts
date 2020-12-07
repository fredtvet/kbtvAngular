import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { _trackById } from 'src/app/shared-app/helpers/trackby/track-by-id.helper';
import { AppButton } from 'src/app/shared-app/interfaces/app-button.interface';
import { _trackByAppButton } from 'src/app/shared-app/track-by-app-button';

type DisplayMode = "overlay" | "side";

@Component({
  selector: 'app-main-skeleton',
  templateUrl: './main-skeleton.component.html', 
  styleUrls: ['./main-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSkeletonComponent{
  ButtonTypes = ButtonTypes;

  @Input() childDisplayMode: DisplayMode;
  @Input() childSize: number = 60;

  @Input() fabs: AppButton[];
  @Input() disableElevation: boolean;

  childDisplayMode$: Observable<DisplayMode> = this.deviceInfoService.isS$.pipe(
    map(x => this.childDisplayMode || (x === true ? 'overlay' : 'side')), 
    distinctUntilChanged<DisplayMode>()
  );

  constructor(private deviceInfoService: DeviceInfoService){ }

  trackByFab = _trackByAppButton;

  trackByChipRow = _trackById;

}
