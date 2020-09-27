import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { BaseTopNavComponent } from 'src/app/shared-app/components/base-top-nav.component';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { MainTopNavConfig } from './main-top-nav-config.interface';

@Component({
  selector: 'app-main-top-nav',
  templateUrl: './main-top-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[MatBottomSheet]
})
export class MainTopNavComponent extends BaseTopNavComponent<MainTopNavConfig>{
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('navBar', {read: ElementRef}) navBar: ElementRef;

  ButtonTypes = ButtonTypes;
  
  loading$: Observable<boolean> = this.loadingService.queryLoading$;

  searchBarHidden: boolean = true;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private loadingService: LoadingService) {
      super(changeDetectorRef);
  }

  onMenuButtonClick = () => this.toggleDrawer.emit();

  toggleSearchBar = () => {
    if(!this.searchBarHidden) this.resetSearch(); //Reset criteria when hiding
    this.searchBarHidden = !this.searchBarHidden
  };

  handleSearchFn = (criteria: string) => this.config.searchBar.callback(criteria);

  private resetSearch(){
    if(this.searchInput.nativeElement.value) this.handleSearchFn(null); 
    this.searchInput.nativeElement.value = "";
  }
}
