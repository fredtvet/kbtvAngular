import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MissionNoteFormSheetWrapperComponent } from './mission-note-form/mission-note-form-sheet-wrapper.component';
import { MissionNoteFormComponent } from './mission-note-form/mission-note-form.component';
import { MissionNoteFormViewComponent } from './mission-note-form/mission-note-form-view/mission-note-form-view.component';
import { MissionNoteFormRoutingModule } from './mission-note-form-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MissionNoteFormEntryComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private location: Location
    ) {
    let idPreset:number = +this.route.snapshot.queryParams['idPreset'];
    let missionId:number = +this.route.snapshot.queryParams['missionId'];
    this.openDialog({idPreset, missionId});
   }

  openDialog = (data) => {
    let ref = this.bottomSheet.open(MissionNoteFormSheetWrapperComponent, {data});
    ref.afterDismissed().subscribe(x => this.location.back())
  };
}

@NgModule({
  declarations: [
    MissionNoteFormEntryComponent,
    MissionNoteFormSheetWrapperComponent,
    MissionNoteFormComponent,
    MissionNoteFormViewComponent
  ],
  imports: [
    MissionNoteFormRoutingModule,
    SharedModule
  ]
})
export class MissionNoteFormModule { }
