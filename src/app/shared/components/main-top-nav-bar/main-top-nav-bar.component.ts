import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MainNavService } from 'src/app/layout/main-nav.service';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { _trackByAppButton } from 'src/app/shared-app/track-by-app-button';
import { MainTopNavConfig } from './main-top-nav.config';

@Component({
  selector: 'app-main-top-nav-bar',
  templateUrl: './main-top-nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  toggleSearchBar = () => 
    this.searchBarHidden = !this.searchBarHidden

  handleSearchFn = (criteria: string) => this.config.searchBar.callback(criteria);

  TrackByButton = _trackByAppButton

}
