import { NgModule } from '@angular/core';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { MissionMapRoutingModule } from './mission-map-routing.module';
import { MissionMapComponent } from './mission-map/mission-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ConvertToGooglePositionPipe } from './pipes/convert-to-google-position.pipe';
import { MissionMarkerOptionsPipe } from './pipes/mission-marker-options.pipe';
import { MissionMapViewComponent } from './mission-map/mission-map-view/mission-map-view.component';

@NgModule({
  declarations: [
    MissionMapComponent,
    MissionMapViewComponent,
    ConvertToGooglePositionPipe,
    MissionMarkerOptionsPipe
  ],
  imports: [
    SharedMissionModule,
    MissionMapRoutingModule,   
    GoogleMapsModule,
    HttpClientJsonpModule 
  ],
  providers: []
})
export class MissionMapModule {}
