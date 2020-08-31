import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { FormConfig } from 'src/app/shared/interfaces';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';
import { ComponentType } from '@angular/cdk/portal';

export abstract class FormEntryComponent {

  private formConfig: FormConfig = 
    this.route.snapshot.params['config'] ? JSON.parse(this.route.snapshot.params['config']) : null;

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private location: Location,
    formSheetComponent: ComponentType<FormSheetWrapperComponent>
    ) {
    this.openDialog(formSheetComponent);
   }

  private openDialog = <T>(compRef: ComponentType<T>) => {
    let ref = this.bottomSheet.open(compRef, {data: this.formConfig});
    ref?.afterDismissed().subscribe(hasNavigated => !hasNavigated ? this.location.back() : null)
  };

}
