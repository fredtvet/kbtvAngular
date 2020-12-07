import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogConfig } from '@shared/components';

@Injectable({ providedIn: "any" })
export class ConfirmDialogService {

  constructor(private matDialog: MatDialog) {}

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