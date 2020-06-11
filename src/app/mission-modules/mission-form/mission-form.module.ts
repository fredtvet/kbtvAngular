import { NgModule } from '@angular/core';
import { MissionFormEntryComponent } from './mission-form-entry.component';
import { MissionFormSheetWrapperComponent } from './mission-form/mission-form-sheet-wrapper.component';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MissionFormViewComponent } from './mission-form/mission-form-view/mission-form-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionFormRoutingModule } from './mission-form-routing.module';

@NgModule({
    declarations: [
      MissionFormEntryComponent,
      MissionFormSheetWrapperComponent,
      MissionFormComponent,
      MissionFormViewComponent,
    ],
    imports: [
      SharedModule,
      MissionFormRoutingModule
    ]
  })
export class MissionFormModule { }