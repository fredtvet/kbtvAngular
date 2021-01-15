import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-main-bottom-nav',
  template: `
  <mat-toolbar style="padding:0;overflow:hidden;" color="primary" 
    fxLayout="row" fxLayoutAlign="space-around center">
    <ng-container *ngFor="let button of navigations;">
      <app-main-bottom-nav-button fxFlex
        *ifRole="button.allowedRoles" 
        [config]="button">
      </app-main-bottom-nav-button>
    </ng-container>
  </mat-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBottomNavComponent {

  @Input() navigations: AppButton[];

  isIphone = this.deviceInfoService.isIphone

  constructor(private deviceInfoService: DeviceInfoService) {}
}
