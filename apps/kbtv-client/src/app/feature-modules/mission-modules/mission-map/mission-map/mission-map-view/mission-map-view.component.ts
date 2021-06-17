import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Mission } from '@core/models';
import { DeviceInfoService } from '@core/services/device-info.service';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mission-map-view',
  templateUrl: './mission-map-view.component.html',
  styleUrls: ['./mission-map-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionMapViewComponent{
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
    
    @Input() missions: Immutable<Maybe<Mission[]>>;

    center$: Observable<google.maps.LatLngLiteral> = 
        this.deviceInfoService.userLocation$.pipe(map(pos => { return {
            lng: pos.coords.longitude, lat: pos.coords.latitude
        }}));

    constructor(private deviceInfoService: DeviceInfoService) { }

    openInfoWindow(marker: MapMarker, mission: Mission) {
        this.infoWindow.infoWindow?.setContent(mission.address!);
        this.infoWindow.open(marker);
    }

    trackByFn = _trackByModel("missions");

}
