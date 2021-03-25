import { NgModule } from '@angular/core';
import { GooglePlaceDirective } from './google-places-autocomplete.directive';

/** Responsible for declaring & exporting GooglePlaceDirective */
@NgModule({
    declarations: [ GooglePlaceDirective ],
    exports: [ GooglePlaceDirective ]
})
export class GooglePlacesAutocompleteModule { }
  