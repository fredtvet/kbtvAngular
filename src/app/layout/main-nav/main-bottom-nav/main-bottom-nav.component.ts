import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-main-bottom-nav',
  template: `
  <mat-toolbar class="mat-elevation-z4 bg-primary" style="padding:0!important;overflow:hidden" fxLayout="row" fxLayoutAlign="space-around center">
    <ng-container *ngFor="let button of config.navigations;">
      <app-main-bottom-nav-button fxFlex=25    
        *ifRole="button.allowedRoles" 
        [config]="button">
      </app-main-bottom-nav-button>
    </ng-container>
  </mat-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBottomNavComponent {

  @Input() config: {navigations: AppButton[]}

  constructor() {}
}
