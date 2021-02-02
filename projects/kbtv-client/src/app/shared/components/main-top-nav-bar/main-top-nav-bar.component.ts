import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { _trackByAppButton } from '@shared-app/track-by-app-button';
import { Observable } from 'rxjs';
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
  
  loading$: Observable<boolean> = this.loadingService.loading$;

  baseActionBtn: Partial<AppButton> = {type: ButtonTypes.Icon}

  constructor(
    private loadingService: LoadingService,
    private router: Router
  ) {}

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
