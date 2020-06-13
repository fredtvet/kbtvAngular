import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoadingService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { TopDetailNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { BottomSheetMenuComponent } from 'src/app/shared-app/components';

@Component({
  selector: 'app-detail-top-nav',
  templateUrl: './detail-top-nav.component.html',
  styleUrls: ['./detail-top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailTopNavComponent {
  @Input() config: TopDetailNavConfig;
  @Input() currentUserRole: string;
  @Output() menuBtnClicked = new EventEmitter();
  
  loading$: Observable<boolean> = this.loadingService.queryLoading$;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private loadingService: LoadingService,) { }
  
  onMenuButtonClick = () => this.menuBtnClicked.emit();
  
  openBottomSheet = (buttons: AppButton[]) => this._bottomSheet.open(BottomSheetMenuComponent, { data: buttons });
}
