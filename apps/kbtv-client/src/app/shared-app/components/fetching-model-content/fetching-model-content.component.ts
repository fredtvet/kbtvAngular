import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { ModelState } from '@core/state/model-state.interface';
import { Prop } from 'global-types';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from 'state-management';
import { StateIsFetching } from 'model-state';

@Component({
  selector: 'app-fetching-model-content',
  templateUrl: './fetching-model-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FetchingModelContentComponent{
    @Input() modelProp: Prop<ModelState>;

    vm$: Observable<{isOnline: boolean, isFetching: boolean}> = combineLatest([
        this.store.selectProperty$<Record<Prop<ModelState>, boolean>>('isFetching'),
        this.deviceInfoService.isOnline$
    ]).pipe(
        map(([isFetching, isOnline]) => { return { 
            isFetching: isFetching && isFetching[this.modelProp], 
            isOnline 
        }})
    )
    constructor(
        private store: Store<StateIsFetching<ModelState>>,
        private deviceInfoService: DeviceInfoService,
    ){}
}
