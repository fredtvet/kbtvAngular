import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mission } from 'src/app/core/models';
import { BaseFormViewComponent } from 'src/app/core/services/form/abstracts/base-form-view-component';
import { ActiveStringFilterConfig } from 'src/app/shared/interfaces/active-string-filter-config.interface';
import { MissionCriteria } from 'src/app/shared/interfaces/mission-filter-criteria.interface';
import { MissionFilterViewConfig } from './mission-filter-view-config.interface';

@Component({
  selector: 'app-mission-filter-view',
  templateUrl: './mission-filter-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFilterViewComponent extends BaseFormViewComponent<MissionFilterViewConfig, MissionCriteria>{
  
  stringFilterConfig: ActiveStringFilterConfig<Mission>;

  constructor(private _formBuilder: FormBuilder) { super() }
  
  reset = () => {
    this.form.reset({finished: false});
    this.form.markAsDirty()
  }

  isFormNotEmpty = () => {
    for (var key in this.form.value) {  
      if(this.form.value[key]) return true;
    }
  }

  protected _onConfigChanges(){
    super._onConfigChanges();
    this.stringFilterConfig = {
      data: this.config?.state?.missions,
      stringProps: ['id', 'address'],
      initialString: this.config?.criteria?.searchString, 
      stringChanges$: this.searchString.valueChanges,
      maxChecks: 50,
    }
  }

  protected _initalizeForm(cfg: MissionFilterViewConfig): FormGroup{
    const criteria = cfg?.criteria;
    return this._formBuilder.group({
      searchString: [criteria?.searchString],     
      employerId: [criteria?.employerId],
      missionTypeId: [criteria?.missionTypeId],    
      finished: [criteria?.finished || false],
    });
  }

  get searchString(){
    return this.form.get('searchString')
  }
  get employerId(){
    return this.form.get('employerId')
  }  
  get missionTypeId(){
    return this.form.get('missionTypeId')
  }  
  get finished(){
    return this.form.get('finished')
  }
}
