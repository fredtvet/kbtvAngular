import { Pipe, PipeTransform } from '@angular/core';
import { IPosition } from '@core/models/sub-interfaces/iposition.interface';

@Pipe({name: 'appConvertToGooglePosition'})
export class ConvertToGooglePositionPipe implements PipeTransform {

  transform(position: IPosition): google.maps.LatLngLiteral {
    return {
      lat: position.latitude,
      lng: position.longitude
    };
  }

}
