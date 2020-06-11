import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { filter } from 'rxjs/operators';

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
    private _userService: UserService,
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
    let confirmString = 'Bekreft at du ønsker å slette oppdragsgiveren fra systemet.'
    const deleteDialogRef = this._dialog.open(ConfirmDialogComponent, {data: confirmString});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteEmployer());
  }

  private deleteEmployer = () => 
    this._userService.delete$(this.data.userNamePreset).subscribe(x => this.close());
  
}
