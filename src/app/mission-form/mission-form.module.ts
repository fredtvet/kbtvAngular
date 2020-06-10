import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MissionFormRoutingModule } from './mission-form-routing.module';
import { MissionFormEntryComponent } from './mission-form-entry.component';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MissionFormSheetWrapperComponent } from './mission-form/mission-form-sheet-wrapper.component';
import { MissionFormViewComponent } from './mission-form/mission-form-view/mission-form-view.component';



@NgModule({
  declarations: [
    MissionFormEntryComponent,
    MissionFormSheetWrapperComponent,
    MissionFormComponent,
    MissionFormViewComponent,
  ],
  entryComponents: [
    MissionFormSheetWrapperComponent
  ],
  imports: [
    SharedModule,
    MissionFormRoutingModule
  ]
})
export class MissionFormModule { }
