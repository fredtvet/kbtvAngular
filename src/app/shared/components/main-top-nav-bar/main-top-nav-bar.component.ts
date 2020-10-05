import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MainNavService } from 'src/app/layout/main-nav.service';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { TrackByAppButton } from 'src/app/shared-app/track-by-app-button';
import { MainTopNavConfig } from './main-top-nav.config';

@Component({
  selector: 'app-main-top-nav-bar',
  templateUrl: './main-top-nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[MatBottomSheet]
})
export class MainTopNavBarComponent {
  @ViewChild('searchInput') searchInput: ElementRef;
  
  @Input() config: MainTopNavConfig;
  @Input() stylingClass: string;

  ButtonTypes = ButtonTypes;
  
  loading$: Observable<boolean> = this.loadingService.loading$;

  searchBarHidden: boolean = true;

  constructor(
      private mainNavService: MainNavService,
      private loadingService: LoadingService
    ) {}

  onMenuButtonClick = () => this.mainNavService.toggleDrawer();

  toggleSearchBar = () => {
    if(!this.searchBarHidden) this.resetSearch(); //Reset criteria when hiding
    this.searchBarHidden = !this.searchBarHidden
  };

  handleSearchFn = (criteria: string) => this.config.searchBar.callback(criteria);

  TrackByButton = TrackByAppButton

  private resetSearch(){
    if(this.searchInput.nativeElement.value) this.handleSearchFn(null); 
    this.searchInput.nativeElement.value = "";
  }
}
