import { Location } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { _filter, _groupBy } from 'array-helpers';
import { ImmutableArray } from 'global-types';
import { CompletedCommand, QueuedCommand, StateRequestLog, StateRequestQueue } from 'optimistic-http';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';

interface ViewModel { 
  requestQueue?: ImmutableArray<QueuedCommand>;
  completedRequests?: ImmutableArray<CompletedCommand>; 
  failedRequests?: ImmutableArray<CompletedCommand>;
  isOnline: boolean;
}

@Component({
  selector: 'app-request-log',
  templateUrl: './request-log.component.html',
  styleUrls: ['./request-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestLogComponent {

  navConfig: MainTopNavConfig = { title: "Aktivitetslogg", backFn: () => this.location.back() };

  private sortedRequestLog$: Observable<Partial<ViewModel>> = this.store.selectProperty$<CompletedCommand[]>("requestLog").pipe(
    map(x => {
      const grouped = _groupBy(x, "succeeded");
      return { completedRequests: grouped['true'], failedRequests: grouped['false'] }
    })
  );

  vm$: Observable<ViewModel> = combineLatest([
    this.store.selectProperty$<QueuedCommand[]>("requestQueue"),
    this.sortedRequestLog$,
    this.deviceInfoService.isOnline$
  ]).pipe(map(([requestQueue, sortedLog, isOnline]) => { return {requestQueue, isOnline, ...sortedLog}}))

  constructor(
    private store: Store<StateRequestLog & StateRequestQueue>,
    private location: Location,
    private deviceInfoService: DeviceInfoService
  ) {}

}
