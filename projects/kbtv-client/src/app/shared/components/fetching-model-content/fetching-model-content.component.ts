import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { ModelState } from '@core/state/model-state.interface';
import { Prop } from 'global-types';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { StateFetchedModels } from 'state-model';

@Component({
  selector: 'app-fetching-model-content',
  templateUrl: './fetching-model-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FetchingModelContentComponent{
    @Input() modelProp: Prop<ModelState>;

    vm$: Observable<{isOnline: boolean, isFetching: boolean}> = combineLatest([
        this.store.selectProperty$<Record<Prop<ModelState>, boolean>>('fetchedModels'),
        this.deviceInfoService.isOnline$
    ]).pipe(
        map(([fetchedModels, isOnline]) => { return { 
            isFetching: !fetchedModels ||  !fetchedModels[this.modelProp], 
            isOnline 
        }})
    )

    constructor(
        private store: Store<StateFetchedModels<ModelState>>,
        private deviceInfoService: DeviceInfoService,
    ){}
}
