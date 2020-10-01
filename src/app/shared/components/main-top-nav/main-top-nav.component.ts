import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces/app-button.interface';
import { TrackByCallback } from 'src/app/shared-app/track-by-callback';
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
  
  trackByFab = (index: number, fab:AppButton) => TrackByCallback(index, fab.callback);
}
