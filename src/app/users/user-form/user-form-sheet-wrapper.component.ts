import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AppButton, SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components';
import { UsersStore } from '../users.store';

@Component({
  selector: 'app-user-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-user-form 
      [userNamePreset]="data?.userNamePreset"
      (finished)="close()">
  </app-user-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private store: UsersStore,
    private _dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef<UserFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {userNamePreset: string}) { }

  ngOnInit() {
    let isCreateForm = (!this.data || !this.data.userNamePreset);
    this.navConfig = {
      title: !isCreateForm ? 'Rediger bruker' : 'Registrer bruker',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
      buttons: !isCreateForm ? [{icon: 'delete_forever', callback: this.confirmDelete} as AppButton] : undefined
    }
  }

  close = () => this._bottomSheetRef.dismiss();

  private confirmDelete = () => {
    let config: ConfirmDialogConfig = {message: 'Slett bruker?', confirmText: 'Slett'};
    const deleteDialogRef = this._dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteUser());
  }

  private deleteUser = () => 
    this.store.delete$(this.data.userNamePreset).subscribe(x => this.close());
  
}
