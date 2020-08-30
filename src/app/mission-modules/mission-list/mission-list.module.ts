import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionFilterSheetWrapperComponent } from './mission-filter/mission-filter-sheet-wrapper.component';
import { MissionFilterViewComponent } from './mission-filter/mission-filter-view/mission-filter-view.component';
import { MissionFilterComponent } from './mission-filter/mission-filter.component';
import { MissionListRoutingModule } from './mission-list-routing.module';
import { MissionListViewComponent } from './mission-list/mission-list-view/mission-list-view.component';
import { MissionListComponent } from './mission-list/mission-list.component';


@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionDetailsViewComponent,
    MissionListComponent,
    MissionListViewComponent, 
    MissionFilterComponent,
    MissionFilterViewComponent,
    MissionFilterSheetWrapperComponent  
  ],
  providers: [],
  imports: [
    SharedModule,
    MissionListRoutingModule
  ]
})
export class MissionListModule { }
