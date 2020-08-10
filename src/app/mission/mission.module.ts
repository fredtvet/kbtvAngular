import { NgModule } from '@angular/core';
import { MissionRoutingModule } from './mission-routing.module';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  providers: [
    DatePipe
  ],
  imports: [
    SharedModule,
    MissionRoutingModule
  ]
})
export class MissionModule { }
