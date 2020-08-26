import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FilterSheetWrapperComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-mission-filter-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-filter (filterUpdated)="close()"></app-mission-filter>
  </app-simple-top-nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFilterSheetWrapperComponent extends FilterSheetWrapperComponent {

  constructor(_bottomSheetRef: MatBottomSheetRef<MissionFilterSheetWrapperComponent>) { 
    super(_bottomSheetRef) 
  }

}
