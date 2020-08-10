import { NgModule } from '@angular/core';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { DatePipe } from '@angular/common';
import { MissionListViewComponent } from './mission-list/mission-list-view/mission-list-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionsFacade } from './missions.facade';
import { MissionFilterWrapperComponent } from './mission-filter/mission-filter-wrapper.component';
import { MissionFilterViewComponent } from './mission-filter/mission-filter-view/mission-filter-view.component';
import { MissionFilterComponent } from './mission-filter/mission-filter.component';
import { MissionListRoutingModule } from './mission-list-routing.module';


@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionDetailsViewComponent,
    MissionListComponent,
    MissionListViewComponent, 
    MissionFilterComponent,
    MissionFilterViewComponent,
    MissionFilterWrapperComponent  
  ],
  providers: [
    DatePipe,
    MissionsFacade
  ],
  imports: [
    SharedModule,
    MissionListRoutingModule
  ]
})
export class MissionListModule { }
