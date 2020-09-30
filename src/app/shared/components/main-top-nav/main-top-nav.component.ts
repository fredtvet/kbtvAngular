import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { TrackByAppButton } from 'src/app/shared-app/track-by-app-button';
import { MainTopNavConfig } from './main-top-nav-config.interface';

@Component({
  selector: 'app-main-top-nav',
  templateUrl: './main-top-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[MatBottomSheet]
})
export class MainTopNavComponent{
  ButtonTypes = ButtonTypes;

  @Input() config: MainTopNavConfig;
  
  trackByFab = TrackByAppButton;
}
