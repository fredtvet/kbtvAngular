import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-bottom-sheet-menu',
  template:`

    <ng-container *ngFor="let button of buttons">
      <a *ifRole="button.allowedRoles" (click)="handleFn(button.callback, button.params)">
        <app-list-item>
          <mat-icon left-side>{{ button.icon }}</mat-icon>
          <span>{{ button.text }}</span>
        </app-list-item>
      </a>
    </ng-container>

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
