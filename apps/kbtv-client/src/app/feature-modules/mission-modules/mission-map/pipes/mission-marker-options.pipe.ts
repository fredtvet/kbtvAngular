import { Pipe, PipeTransform } from '@angular/core';
import { GoogleMapsMarkerIcons } from '@shared-app/constants/google-maps-marker-icons.const';

@Pipe({name: 'appMissionMarkerOptions'})
export class MissionMarkerOptionsPipe implements PipeTransform {

  transform(finished: boolean, isExact: boolean): google.maps.MarkerOptions {
    let iconUrl;

    if(finished) iconUrl = GoogleMapsMarkerIcons.Green
    else if(!isExact) iconUrl = GoogleMapsMarkerIcons.Blue;
    else iconUrl = GoogleMapsMarkerIcons.Red;

    return { draggable: false, icon: { url: iconUrl } };
  }

}
