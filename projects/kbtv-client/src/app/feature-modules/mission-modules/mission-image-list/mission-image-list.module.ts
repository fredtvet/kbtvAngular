import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { STORE_ACTION_INTERCEPTORS, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DeleteModelHttpEffect, DeleteModelReducer, MailModelsHttpEffect } from 'state-model';
import { CreateMissionImagesHttpEffect } from './create-mission-images/create-mission-images.http.effect';
import { CreateMissionImagesReducer } from './create-mission-images/create-mission-images.reducer';
import { CreateMissionImagesValidatorInterceptor } from './create-mission-images/create-mission-images.validator';
import { MissionImageListRoutingModule } from './mission-image-list-routing.module';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';
import { ArraySlicePipe } from './pipes/array-slice.pipe';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';


@NgModule({
  declarations: [
    MissionImageListComponent,
    ArraySlicePipe,
    NumberToArrayPipe
  ],
  imports: [
    SharedModule,
    MissionImageListRoutingModule,
  ],
  providers:[
    { provide: STORE_REDUCERS, useValue: CreateMissionImagesReducer, multi: true},
    { provide: STORE_EFFECTS, useClass: CreateMissionImagesHttpEffect, multi: true},
    {provide: STORE_EFFECTS, useClass: MailModelsHttpEffect, multi: true},
    {provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
    {provide: STORE_ACTION_INTERCEPTORS, useClass: CreateMissionImagesValidatorInterceptor, multi: true},
  ]
})
export class MissionImageListModule {}
