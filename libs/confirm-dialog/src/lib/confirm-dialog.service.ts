import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogConfig } from './confirm-dialog-config.interface';
import { ConfirmDialogComponent } from './confirm-dialog.component';

/** Responsible for rendering a confirmation dialog on request */
@Injectable({ providedIn: "any" })
export class ConfirmDialogService {

  constructor(private matDialog: MatDialog) {}

  /**
   * Opens a confirmation dialog, forcing the user to take action before proceeding.
   * @param config -
   * @returns A reference to an opened dialog. @see {@link https://material.angular.io/components/dialog/api}
   */
  open(config: ConfirmDialogConfig): MatDialogRef<ConfirmDialogComponent, boolean> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, { data: config });
    
    if(config.cancelCallback || config.confirmCallback)
        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed && config.confirmCallback) config.confirmCallback();
            else if(!confirmed && config.cancelCallback) config.cancelCallback();
        })

    return dialogRef;
  }  
}