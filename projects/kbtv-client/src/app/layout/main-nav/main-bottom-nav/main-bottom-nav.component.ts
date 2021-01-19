import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-main-bottom-nav',
  template: `
  <mat-toolbar class="bottom-nav-container" color="accent">
    <ng-container *ngFor="let button of navigations;">
      <app-main-bottom-nav-button fxFlex
        *ifRole="button.allowedRoles" 
        [config]="button">
      </app-main-bottom-nav-button>
    </ng-container>
  </mat-toolbar>
  `,
  styleUrls: ['./main-bottom-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBottomNavComponent {

  @Input() navigations: AppButton[];

  isIphone = this.deviceInfoService.isIphone

  constructor(private deviceInfoService: DeviceInfoService) {}
}
