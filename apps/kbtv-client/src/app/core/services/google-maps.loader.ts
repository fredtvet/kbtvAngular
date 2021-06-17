import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoader {

    load$: Observable<boolean> = from(new Loader({
        apiKey: environment.googleMapsKey,
        libraries: ["places", "geometry"]
    }).load()).pipe(map(x => true));

}