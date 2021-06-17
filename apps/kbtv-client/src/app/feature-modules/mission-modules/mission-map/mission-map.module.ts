import { HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { MissionMapRoutingModule } from './mission-map-routing.module';
import { MissionMapViewComponent } from './mission-map/mission-map-view/mission-map-view.component';
import { MissionMapComponent } from './mission-map/mission-map.component';
import { MissionMarkerOptionsPipe } from './pipes/mission-marker-options.pipe';

@NgModule({
  declarations: [
    MissionMapComponent,
    MissionMapViewComponent,
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
