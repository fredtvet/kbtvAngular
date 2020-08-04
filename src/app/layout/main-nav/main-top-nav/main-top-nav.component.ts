import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy  } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoadingService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { TopDefaultNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { BottomSheetMenuComponent } from 'src/app/shared-app/components';
import { ButtonTypes } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-main-top-nav',
  templateUrl: './main-top-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTopNavComponent {
  ButtonTypes = ButtonTypes;
  @Input() config: TopDefaultNavConfig;
  @Input() currentUserRole: string;
  @Output() menuBtnClicked = new EventEmitter();
  
  loading$: Observable<boolean> = this.loadingService.queryLoading$;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private loadingService: LoadingService) { }

  onMenuButtonClick = () => this.menuBtnClicked.emit();
  
  openBottomSheet = (buttons: AppButton[]) => this._bottomSheet.open(BottomSheetMenuComponent, { data: buttons });
}
