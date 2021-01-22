import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { _trackByAppButton } from '@shared-app/track-by-app-button';
import { Observable } from 'rxjs';
import { MainNavService } from 'src/app/layout/main-nav.service';
import { MainTopNavConfig } from './main-top-nav.config';

@Component({
  selector: 'app-main-top-nav-bar',
  templateUrl: './main-top-nav-bar.component.html',
  styleUrls: ['./main-top-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTopNavBarComponent {
  @ViewChild('searchInput') searchInput: ElementRef;
  
  @Input() config: MainTopNavConfig;
  @Input() stylingClass: string;
  @Input() overlayMode: boolean;

  ButtonTypes = ButtonTypes;
  
  loading$: Observable<boolean> = this.loadingService.loading$;

  searchBarHidden: boolean = true;

  constructor(
      private mainNavService: MainNavService,
      private loadingService: LoadingService
    ) {}

  onMenuButtonClick = () => this.mainNavService.toggleDrawer();

  toggleSearchBar = () => this.searchBarHidden = !this.searchBarHidden

  handleSearchFn = (criteria: string): void => this.config.searchBar?.callback(criteria);

  TrackByButton = _trackByAppButton

}
