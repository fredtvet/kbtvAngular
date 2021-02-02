import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AppButton } from "@shared/components/app-button/app-button.interface";

@Component({
  selector: "app-main-bottom-nav-button",
  template: `
    <style>
      .active-nav-button{ opacity:1!important }
      .nav-button{ width:100%;height:100%;opacity:.6 }
    </style>
    <button mat-button class="nav-button" *ngIf="config"
      [routerLink]="config.routerLink"
      [routerLinkActive]="['active-nav-button']"
      [attr.aria-label]="config.aria">

      <span fxLayout="column" fxLayoutAlign="start center" >
        <mat-icon>{{ config.icon }}</mat-icon>
        <span class="mat-caption" style="font-weight:500;">{{ config.text }}</span>
      </span>

    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBottomNavButtonComponent {
  @Input() config: AppButton;

  constructor() {}
}
