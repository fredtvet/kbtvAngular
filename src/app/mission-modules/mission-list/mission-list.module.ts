import { NgModule } from '@angular/core';
import { SaveModelFileHttpEffect } from 'src/app/core/services/model/state/save-model-file/save-model-file.http.effect';
import { SaveModelFileReducer } from 'src/app/core/services/model/state/save-model-file/save-model-file.reducer';
import { AppFileUrlPipe } from 'src/app/shared/pipes/app-file-url.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListRoutingModule } from './mission-list-routing.module';
import { MissionListStore } from './mission-list.store';
import { MissionListViewComponent } from './mission-list/mission-list-view/mission-list-view.component';
import { MissionListComponent } from './mission-list/mission-list.component';


@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionDetailsViewComponent,
    MissionListComponent,
    MissionListViewComponent, 
  ],
  providers: [
    AppFileUrlPipe,
  ],
  imports: [
    SharedModule,
    MissionListRoutingModule
  ]
})
export class MissionListModule { 
  constructor(
    saveModelFileReducer: SaveModelFileReducer,
    saveModelFileHttpEffect: SaveModelFileHttpEffect
  ){}
}
