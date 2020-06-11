import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MissionFormSheetWrapperComponent } from './mission-form/mission-form-sheet-wrapper.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MissionFormViewComponent } from './mission-form/mission-form-view/mission-form-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionFormRoutingModule } from './mission-form-routing.module';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MissionFormEntryComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private location: Location
    ) {
    let idPreset:number = +this.route.snapshot.queryParams['idPreset'];

    this.openDialog({idPreset});
   }

  openDialog = (data) => {
    let ref = this.bottomSheet.open(MissionFormSheetWrapperComponent, {data});
    ref.afterDismissed().subscribe(x => this.location.back())
  };
}

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