import { NgModule } from '@angular/core';
import { AppSaveModelProviders, SaveModelFileProviders } from '@core/state/providers.const';
import { ModelFormModule } from 'model-form';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { AppFileUrlPipe } from '@shared/pipes/app-file-url.pipe';
import { SharedModule } from '@shared/shared.module';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DeleteModelHttpEffect, DeleteModelReducer } from 'state-model';
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
    ...AppSaveModelProviders,
    {provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: UpdateLastVisitedReducer, multi: true}
  ],
  imports: [
    SharedModule,
    MissionListRoutingModule,
    ModelFormModule.forFeature(_formToSaveModelConverter),
  ]
})
export class MissionListModule {}
