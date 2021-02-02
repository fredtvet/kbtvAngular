import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-main-bottom-nav',
  templateUrl: 'main-bottom-nav.component.html',
  styleUrls: ['main-bottom-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBottomNavComponent {

  @Input() navigations: AppButton[];

  isIphone = this.deviceInfoService.isIphone

  constructor(private deviceInfoService: DeviceInfoService) {}
}
