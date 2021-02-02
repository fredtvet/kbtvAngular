import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { _trackById } from '@shared-app/helpers/trackby/track-by-id.helper';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { _trackByAppButton } from '@shared-app/track-by-app-button';
import { MainSkeletonRouteData } from './main-skeleton-route-data.interface';
import { MainSkeletonPresenter } from './main-skeleton.presenter';

@Component({
  selector: 'app-main-skeleton',
  templateUrl: './main-skeleton.component.html', 
  styleUrls: ['./main-skeleton.component.scss'],
  providers: [MainSkeletonPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSkeletonComponent {
  @Input() fabs: AppButton[];
  
  @Input() set enableElevation(value: boolean) {
    this.presenter.toggleElevation(value);
  }

  @Input() navTogglerDisabled: boolean;
  @Input() paddingDisabled: boolean;
  @Input() bottomBarHidden: boolean;
  
  data: MainSkeletonRouteData = this.presenter.data;

  enableElevation$ = this.presenter.enableElevation$;

  baseFabBtn: Partial<AppButton> = {type: ButtonTypes.Fab}
  
  constructor(private presenter: MainSkeletonPresenter){ }

  ngOnInit(): void { this.presenter.init() }
  
  trackByFab = _trackByAppButton;

  trackByChipRow = _trackById; 

}
