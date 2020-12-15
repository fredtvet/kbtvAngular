import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppButton } from '@shared-app/interfaces';

@Component({
  selector: 'app-bottom-sheet-menu',
  template:`
  <span class="nav-list mat-subheading-2">
    <ng-container #navs *ngFor="let button of buttons">
        <a *ifRole="button.allowedRoles" (click)="handleFn(button.callback, button.params)">
            <mat-icon>{{ button.icon }}</mat-icon>
            <span class="ml-2 mr-2">{{ button.text }}</span>
        </a>
    </ng-container>
  </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetMenuComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public buttons: AppButton[]) { }

  handleFn = (fn: Function, parameters: unknown[] = []) => {
    fn(...parameters);
    this.close();
  };

  close = () => this._bottomSheetRef.dismiss(); 
}
