import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceInfoService } from '@core/services/device-info.service';
import { LoadingResponse, LoadingService } from '@core/services/loading.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-optimistic-loading-spinner',
  templateUrl: './optimistic-loading-spinner.component.html',
  styleUrls: ['./optimistic-loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimisticLoadingSpinnerComponent {

    vm$: Observable<LoadingResponse & {isOnline: boolean}> = combineLatest([
        this.deviceInfoService.isOnline$,
        this.loadingService.loading$
    ]).pipe(
        map(([isOnline, loading]) => { return { isOnline, ...loading }})
    );

    constructor(
        private loadingService: LoadingService,
        private deviceInfoService: DeviceInfoService,
        private router: Router
    ) {}

    goToRequestLog(): void{
        this.router.navigate(["aktivitetslogg"])
    }

}
