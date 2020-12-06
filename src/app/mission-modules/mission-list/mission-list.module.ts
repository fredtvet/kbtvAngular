import { NgModule } from '@angular/core';
import { DeleteModelProviders, SaveModelFileProviders, SaveModelProviders } from 'src/app/model/state/providers.const';
import { ModelFormModule } from 'src/app/shared/model-form/model-form.module';
import { AppFileUrlPipe } from 'src/app/shared/pipes/app-file-url.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsSubscriber } from 'src/app/state/effects.subscriber';
import { STORE_DEFAULT_STATE, STORE_REDUCERS } from 'src/app/state/injection-tokens';
import { StateModule } from 'src/app/state/state.module';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListRoutingModule } from './mission-list-routing.module';
import { MissionListViewComponent } from './mission-list/mission-list-view/mission-list-view.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { UpdateLastVisitedReducer } from './update-last-visited.reducer';

@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionDetailsViewComponent,
    MissionListComponent,
    MissionListViewComponent, 
  ],
  providers: [
    AppFileUrlPipe,
    ...SaveModelFileProviders,
    ...SaveModelProviders,
    ...DeleteModelProviders,
    {provide: STORE_REDUCERS, useValue: UpdateLastVisitedReducer, multi: true}
  ],
  imports: [
    SharedModule,
    MissionListRoutingModule,
    StateModule,
    ModelFormModule,
  ]
})
export class MissionListModule { 
  constructor(effectsSubscriber: EffectsSubscriber){}
}
