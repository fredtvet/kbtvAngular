import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Mission } from '@core/models';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { Immutable, Maybe } from 'global-types';

@Component({
  selector: 'app-mission-map-view',
  templateUrl: './mission-map-view.component.html',
  styleUrls: ['./mission-map-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionMapViewComponent{
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
    
    @Input() missions: Immutable<Maybe<Mission[]>>;

    center: google.maps.LatLngLiteral;

    constructor(private cdRef: ChangeDetectorRef) {  
        this.setCenter();
    }

    openInfoWindow(marker: MapMarker, mission: Mission) {
        this.infoWindow.infoWindow?.setContent(mission.address!);
        this.infoWindow.open(marker);
    }

    trackByFn = _trackByModel("missions");

    private setCenter(){
        navigator.geolocation.getCurrentPosition((pos) => {
            if(!pos.coords) return; 
            this.center = { lng: pos.coords.longitude, lat: pos.coords.latitude };
            this.cdRef.markForCheck();       
        })
    }

}
