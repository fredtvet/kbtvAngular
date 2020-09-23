import { NgModule } from '@angular/core';
import { AppFileUrlPipe } from 'src/app/shared/pipes/app-file-url.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionFilterViewComponent } from './mission-filter-view/mission-filter-view.component';
import { MissionListRoutingModule } from './mission-list-routing.module';
import { MissionListStore } from './mission-list.store';
import { MissionListViewComponent } from './mission-list/mission-list-view/mission-list-view.component';
import { MissionListComponent } from './mission-list/mission-list.component';


@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionDetailsViewComponent,
    MissionListComponent,
    MissionListViewComponent, 
    MissionFilterViewComponent,
  ],
  providers: [
    AppFileUrlPipe,
    {provide: "FILTER_STORE", useExisting: MissionListStore}
  ],
  imports: [
    SharedModule,
    MissionListRoutingModule
  ]
})
export class MissionListModule { }
