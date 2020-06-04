import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { MainNavConfig, TopDetailNavConfig } from 'src/app/shared/interfaces/main-nav-config.interface';
import { AppButton } from 'src/app/shared/interfaces/app-button.interface';
import { BottomSheetMenuComponent } from 'src/app/shared/components/bottom-sheet-menu/bottom-sheet-menu.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoadingService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-top-nav',
  templateUrl: './detail-top-nav.component.html',
  styleUrls: ['./detail-top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailTopNavComponent {


  @Input() config: TopDetailNavConfig;
  @Output() menuBtnClicked = new EventEmitter();
  
  loading$: Observable<boolean> = this.loadingService.queryLoading$;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private loadingService: LoadingService,) { }
  
  onMenuButtonClick = () => this.menuBtnClicked.emit();
  
  openBottomSheet = (buttons: AppButton[]) => this._bottomSheet.open(BottomSheetMenuComponent, { data: buttons });
}
