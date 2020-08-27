import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { FormEntryComponent } from 'src/app/shared/components';
import { MissionFormSheetWrapperComponent } from './mission-form/mission-form-sheet-wrapper.component';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionFormEntryComponent extends FormEntryComponent {

  constructor(
      bottomSheet: MatBottomSheet,
      route: ActivatedRoute,
      location: Location,   
    ) {
      super(bottomSheet, route, location, MissionFormSheetWrapperComponent);
    }

}
