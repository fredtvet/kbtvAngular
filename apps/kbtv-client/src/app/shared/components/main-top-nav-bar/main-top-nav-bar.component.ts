import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { _trackByAppButton } from '@shared-app/track-by-app-button';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { MainTopNavConfig } from './main-top-nav.config';

@Component({
  selector: 'app-main-top-nav-bar',
  templateUrl: './main-top-nav-bar.component.html',
  styleUrls: ['./main-top-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTopNavBarComponent {

  @Input() config: MainTopNavConfig;
  @Input() overlayMode: boolean;
  
  baseActionBtn: Partial<AppButton> = {type: ButtonTypes.Icon}

  constructor(private router: Router) {}

  TrackByButton = _trackByAppButton

  getPrimaryBtn(config: MainTopNavConfig): AppButton{
    return {
      callback: config.backFn || this.onBack, 
      params: config.backFnParams,
      type: ButtonTypes.Icon,
      aria: 'Tilbake',
      icon: 'close'
    }
  }

  private onBack = () => this.router.navigate(['hjem'])

}
