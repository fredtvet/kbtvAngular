import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';
import { EmployerService } from 'src/app/core/services';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-timesheet-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-employer-form
      [employerIdPreset]="data?.employerIdPreset"
      (finished)="close()">
    </app-employer-form>
  </app-simple-top-nav> 
  `
})
export class EmployerFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _employerService: EmployerService,
    private _dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef<EmployerFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {employerIdPreset: number}) { }

  ngOnInit() {
    let isCreateForm = (!this.data || !this.data.employerIdPreset);
    this.navConfig = {
      title: !isCreateForm ? 'Rediger oppdragsgiver' : 'Registrer oppdragsgiver',
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

  private deleteEmployer = () => this._employerService.delete$(this.data.employerIdPreset).subscribe(x => this.close());
  
  

}