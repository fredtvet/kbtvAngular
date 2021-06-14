import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { _trackByAppButton } from '@shared-app/track-by-app-button';
import { Maybe } from 'global-types';
import { MainTopNavConfig } from './main-top-nav.config';

@Component({
  selector: 'app-main-top-nav-bar',
  templateUrl: './main-top-nav-bar.component.html',
  styleUrls: ['./main-top-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTopNavBarComponent {

  @Input() config: Maybe<MainTopNavConfig>;
  @Input() overlayMode: boolean;
  
  baseActionBtn: Partial<AppButton> = {type: ButtonTypes.Icon};

  get primaryBtn(): AppButton {
    return {
      callback: this.config?.customCancelFn || this.onBack, 
      type: ButtonTypes.Icon,
      aria: 'Tilbake', 
      icon: 'close'
    }
  };

  constructor(
    private router: Router,
    private location: Location
  ) {}

  TrackByButton = _trackByAppButton

  private onBack = () => {
    const state = <{navigationId: number}> this.location.getState();
    if(state.navigationId !== 1) this.location.back(); 
    else this.router.navigate(['/'])
  }

}
