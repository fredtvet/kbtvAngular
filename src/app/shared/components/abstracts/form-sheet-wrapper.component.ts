import { OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OnStateDelete } from 'src/app/core/state';
import { AppButton, SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { FormConfig } from 'src/app/shared/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig } from '..';
import { FormAction } from '../../enums';

export abstract class FormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private router: Router,
    private _bottomSheetRef: MatBottomSheetRef<any>,  
    private entityTitle: string,
    public config?: FormConfig,   
    private dialog?: MatDialog,  
    private store?: OnStateDelete) { }

    ngOnInit() {
        let isCreateForm = (!this.config || !this.config.entityId);

        this.navConfig = {
            title: this.config?.customTitle || `${this.config?.entityId ? "Oppdater" : "Legg til"} ${this.entityTitle}`,
            leftBtn: {icon: 'close', callback: this.close} as AppButton,
            buttons: (!isCreateForm && this.store) ? [{icon: 'delete_forever', callback: this.confirmDelete} as AppButton] : undefined
        }
    }

    close(action: FormAction){
        switch(action){
          case FormAction.Delete: this.navigateTo(this.config.onDeleteUri); break;     
          case FormAction.Update: this.navigateTo(this.config.onUpdateUri); break;     
          case FormAction.Create: this.navigateTo(this.config.onCreateUri); break;
          default: this._bottomSheetRef.dismiss(false);
        }
    } 

    private confirmDelete = () => { 
        if(!this.dialog) return;
        let config: ConfirmDialogConfig = {message: `Slett ${this.entityTitle}?`, confirmText: 'Slett'};
        const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
        deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteEntity());
    }

    private deleteEntity = () => 
        this.store?.delete$(this.config?.entityId).subscribe(x => this.close(FormAction.Delete));

    private navigateTo(url: string){
        let hasUrl = url ? true : false;
        if(hasUrl) this.router.navigate([url]);
        this._bottomSheetRef.dismiss(hasUrl);
    }

}
