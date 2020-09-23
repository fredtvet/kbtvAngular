import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services';
import { BaseTopNavComponent } from 'src/app/shared-app/components/base-top-nav.component';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { BottomSheetMenuComponent } from '../bottom-sheet-menu/bottom-sheet-menu.component';
import { DetailTopNavConfig } from './detail-top-nav-config.interface';

@Component({
  selector: 'app-detail-top-nav',
  templateUrl: './detail-top-nav.component.html',
  styleUrls: ['./detail-top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailTopNavComponent extends BaseTopNavComponent<DetailTopNavConfig>{
  ButtonTypes = ButtonTypes;
  
  loading$: Observable<boolean> = this.loadingService.queryLoading$;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private _bottomSheet: MatBottomSheet,
    private loadingService: LoadingService) { 
      super(changeDetectorRef);
    }
  
  onMenuButtonClick = () => this.toggleDrawer.emit();

  random = () => Math.random() * 1000;
  
  openBottomSheet = (buttons: AppButton[]) => this._bottomSheet.open(BottomSheetMenuComponent, { data: buttons });
}
