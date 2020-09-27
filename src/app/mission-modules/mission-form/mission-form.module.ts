import { NgModule } from '@angular/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionFormRoutingModule } from './mission-form-routing.module';
import { MissionFormViewComponent } from './mission-form-view/mission-form-view.component';

@NgModule({
    declarations: [MissionFormViewComponent],
    imports: [
      SharedModule,
      MissionFormRoutingModule,   
      GooglePlaceModule,   
    ]
  })
export class MissionFormModule { }