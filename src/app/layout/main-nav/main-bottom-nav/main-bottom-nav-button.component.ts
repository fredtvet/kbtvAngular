import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AppButton } from "src/app/shared-app/interfaces";

@Component({
  selector: "app-main-bottom-nav-button",
  template: `
    <button mat-button style="width:100%;height:100%"
      *ngIf="config"
      [routerLink]="config.routerLink"
      [routerLinkActive]="['active']"
      [attr.aria-label]="config.aria">

      <span fxLayout="column" fxLayoutAlign="start center">
        <mat-icon>{{ config.icon }}</mat-icon>
        <span class="mat-caption">{{ config.text }}</span>
      </span>

    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBottomNavButtonComponent {
  @Input() config: AppButton;

  constructor() {}
}
