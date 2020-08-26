import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AppButton, SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components';
import { DataManagementStore } from '../../data-management.store';

@Component({
  selector: 'app-timesheet-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-employer-form
      [employerIdPreset]="data?.employerIdPreset"
      (finished)="close()">
    </app-employer-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployerFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private store: DataManagementStore,
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef<EmployerFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {employerIdPreset: number}) { }

  ngOnInit() {
    let isCreateForm = (!this.data || !this.data.employerIdPreset);
    this.navConfig = {
      title: !isCreateForm ? 'Rediger oppdragsgiver' : 'Registrer oppdragsgiver',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
      buttons: !isCreateForm ? [{icon: 'delete_forever', callback: this.confirmDelete} as AppButton] : undefined
    }
  }

  close = () => this.bottomSheetRef.dismiss();

  private confirmDelete = () => {
    let config: ConfirmDialogConfig = {message: 'Slett oppdragsgiver?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteEmployer());
  }

  private deleteEmployer = () => this.store.deleteRange$([this.data.employerIdPreset]).subscribe(x => this.close());
  
  

}