import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-home-nav-tile-grid',
  template: `
    <style>.home-tile{ text-align:center; width:100%; margin-bottom: 3.3% }</style>

    <div fxLayout="row wrap" fxLayoutAlign="space-evenly center">
      <ng-container *ngFor="let nav of navigations">

        <span *ifRole="nav.allowedRoles"
          class="home-tile mat-elevation-z1 foreground-card p-5" fxFlex=45 
          fxLayout="column" fxLayoutAlign="center center" matRipple
          [routerLink]="nav.routerLink"
          [attr.aria-label]="nav.aria">

          <mat-icon class="scale-150 mb-2">{{ nav.icon }}</mat-icon>

          <span>{{ nav.text }}</span>

        </span>

      </ng-container>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNavTileGridComponent{
  @Input() navigations: AppButton[];
}
