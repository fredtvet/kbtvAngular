import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MainNavConfig } from 'src/app/shared/interfaces/main-nav-config.interface';
import { AppButton } from 'src/app/shared/interfaces/app-button.interface';
import { BottomSheetMenuComponent } from 'src/app/shared/components/bottom-sheet-menu/bottom-sheet-menu.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoadingService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-top-nav',
  templateUrl: './main-top-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTopNavComponent implements OnInit {

  @Input() config: MainNavConfig;
  @Output() menuBtnClicked = new EventEmitter();
  
  loading$: Observable<boolean> = this.loadingService.loading$;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private loadingService: LoadingService,) { }

  ngOnInit() {
  }
  
  onMenuButtonClick = () => this.menuBtnClicked.emit();
  
  openBottomSheet = (buttons: AppButton[]) => this._bottomSheet.open(BottomSheetMenuComponent, { data: buttons });
}
