import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterComponent } from 'src/app/core/services/filter/interfaces/filter-component.interface';
import { BaseFormViewComponent } from 'src/app/core/services/form/abstracts/base-form-view-component';
import { WeekCriteria, WeekFilterViewConfig } from './week-filter-view-config.interface';

@Component({
  selector: 'app-week-filter-view',
  templateUrl: './week-filter-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekFilterViewComponent extends BaseFormViewComponent<WeekFilterViewConfig, WeekCriteria> 
  implements FilterComponent<WeekFilterViewConfig, WeekCriteria>{
  
  constructor(private _formBuilder: FormBuilder) { super(); }
  
  protected _initalizeForm(cfg: WeekFilterViewConfig): FormGroup { 
    const criteria = cfg?.criteria;
    const disabled = cfg?.disabledFilters;

    return this._formBuilder.group({
      userName: [{value: criteria?.userName, disabled: disabled?.includes("userName")}, [
        Validators.required,
      ]],
      year: [{value: criteria?.year, disabled: disabled?.includes("year")}, [
        Validators.required,   
      ]],
      weekNr: [{value: criteria?.weekNr, disabled: disabled?.includes("weekNr")}, [
        Validators.required,
      ]],
    });
  }

  get userName(){
    return this.form.get('userName')
  }
  get year(){
    return this.form.get('year')
  }
  get weekNr(){
    return this.form.get('weekNr')
  }


}
