import { NgModule } from '@angular/core';
import { SaveModelFileProviders } from '@core/state/save-model-file/save-model-file.providers';
import { ModelFormModule } from '@model-form/model-form.module';
import { DeleteModelProviders, SaveModelProviders } from '@model/state/providers.const';
import { FormToSaveModelStateCommandAdapter } from '@shared/form-adapters/form-to-save-model-state-command.adapter';
import { AppFileUrlPipe } from '@shared/pipes/app-file-url.pipe';
import { SharedModule } from '@shared/shared.module';
import { EffectsSubscriber } from '@state/effects.subscriber';
import { STORE_REDUCERS } from '@state/constants/injection-tokens.const';
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
    ModelFormModule.forFeature(FormToSaveModelStateCommandAdapter),
  ]
})
export class MissionListModule { 
  constructor(effectsSubscriber: EffectsSubscriber){}
}
