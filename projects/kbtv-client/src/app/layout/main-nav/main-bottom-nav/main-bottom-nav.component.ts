import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-main-bottom-nav',
  template: `
  <mat-toolbar style="padding:0!important;overflow:hidden" color="primary" fxLayout="row" fxLayoutAlign="space-around center">
    <ng-container *ngFor="let button of navigations;">
      <app-main-bottom-nav-button fxFlex style="height:100%"
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

  constructor() {}
}
