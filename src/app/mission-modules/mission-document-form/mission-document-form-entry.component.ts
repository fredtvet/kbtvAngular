import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MissionDocumentFormSheetWrapperComponent } from './mission-document-form/mission-document-form-sheet-wrapper.component';
import { FormEntryComponent } from 'src/app/shared/components';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MissionDocumentFormEntryComponent extends FormEntryComponent {

  constructor(
    bottomSheet: MatBottomSheet,
    route: ActivatedRoute,
    location: Location
    ) {  
     super(bottomSheet, route, location, MissionDocumentFormSheetWrapperComponent)
   }

}