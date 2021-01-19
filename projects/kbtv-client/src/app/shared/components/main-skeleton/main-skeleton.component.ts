import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceInfoService } from '@core/services/device-info.service';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { _trackById } from '@shared-app/helpers/trackby/track-by-id.helper';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { _trackByAppButton } from '@shared-app/track-by-app-button';
import { combineLatest } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MainSkeletonRouteData } from './main-skeleton-route-data.interface';

@Component({
  selector: 'app-main-skeleton',
  templateUrl: './main-skeleton.component.html', 
  styleUrls: ['./main-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSkeletonComponent extends WithUnsubscribe() {
  ButtonTypes = ButtonTypes;
  showChild: boolean;

  @Input() fabs: AppButton[];
  @Input() disableElevation: boolean;

  data: MainSkeletonRouteData = this.route.snapshot.data;

  constructor(
    private deviceInfoService: DeviceInfoService,
    private route: ActivatedRoute,
    private elRef: ElementRef,
  ){ super(); }

  ngOnInit(): void { 
    combineLatest([
      this.deviceInfoService.isS$
    ]).pipe(
      tap(([isS]) => this.changeSize(isS)),
      takeUntil(this.unsubscribe),
    ).subscribe()
  }

  trackByFab = _trackByAppButton;

  trackByChipRow = _trackById; 

  private changeSize(isS: boolean): void{
    const parent: HTMLElement = this.elRef.nativeElement.parentElement;
    const shouldOverlay = isS || this.data.viewSize === 'overlay';
    if(shouldOverlay) parent.classList.add("main-skeleton-overlay");
    else parent.classList.remove("main-skeleton-overlay");
    if(this.data.viewSize && !shouldOverlay) parent.style.width = this.data.viewSize;
  }

}
