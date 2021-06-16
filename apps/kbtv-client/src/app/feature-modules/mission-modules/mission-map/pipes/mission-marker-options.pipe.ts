import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appMissionMarkerOptions'})
export class MissionMarkerOptionsPipe implements PipeTransform {

  transform(finished: boolean, isExact: boolean): google.maps.MarkerOptions {
    let iconUrl;

    if(finished) iconUrl = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    else if(!isExact) iconUrl = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    else iconUrl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

    return { draggable: false, icon: { url: iconUrl } };
  }

}
