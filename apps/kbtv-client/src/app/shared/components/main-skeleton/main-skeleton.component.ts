import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
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
  
  @Input() set enableElevation(value: boolean) {
    this.presenter.toggleElevation(value);
  }

  @Input() navTogglerDisabled: boolean;
  @Input() contentWrapperClass: string;
  @Input() bottomBarHidden: boolean;
  
  data: MainSkeletonRouteData = this.presenter.data;

  enableElevation$ = this.presenter.enableElevation$;

  baseFabBtn: Partial<AppButton> = {type: ButtonTypes.Fab}
  
  constructor(private presenter: MainSkeletonPresenter){ }

  ngOnInit(): void { this.presenter.init() }

}
