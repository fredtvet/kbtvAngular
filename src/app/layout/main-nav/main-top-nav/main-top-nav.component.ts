import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, ViewChild  } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoadingService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { TopDefaultNavConfig } from '../../main-nav-config.interface';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { BottomSheetMenuComponent } from 'src/app/shared-app/components';

@Component({
  selector: 'app-main-top-nav',
  templateUrl: './main-top-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTopNavComponent {
  @ViewChild('searchInput') searchInput: ElementRef;

  ButtonTypes = ButtonTypes;
  @Input() config: TopDefaultNavConfig;
  @Input() currentUserRole: string;
  @Output() menuBtnClicked = new EventEmitter();
  
  loading$: Observable<boolean> = this.loadingService.queryLoading$;

  searchBarHidden: boolean = true;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private loadingService: LoadingService) { }

  onMenuButtonClick = () => this.menuBtnClicked.emit();
  
  openBottomSheet = (buttons: AppButton[]) => this._bottomSheet.open(BottomSheetMenuComponent, { data: buttons });

  toggleSearchBar = () => {
    if(!this.searchBarHidden) this.resetSearch(); //Reset criteria when hiding
    this.searchBarHidden = !this.searchBarHidden
  };

  handleSearchFn = (criteria: string) => this.config.searchBar.callback(criteria);

  private resetSearch(){
    this.handleSearchFn(null); 
    this.searchInput.nativeElement.value = "";
  }
}
