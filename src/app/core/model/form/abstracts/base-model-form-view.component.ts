import { BaseFormViewComponent } from 'src/app/core/form/abstracts/base-form-view-component';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { Model } from 'src/app/core/models';
import { ModelFormViewConfig } from '../interfaces/model-form-view-config.interface';
import { Directive } from "@angular/core";

@Directive()
export abstract class BaseModelFormViewComponent<TFormState, TModel extends Model, 
    TConfig extends ModelFormViewConfig<TModel, TFormState>, TSave extends SaveModelStateCommand<TModel>> 
    extends BaseFormViewComponent<TConfig, TSave> {

    isCreateForm = false;
  
    constructor() { super(); }
  
    protected _convertFormDataToResponse(): TSave{
        return {entity: this.form.getRawValue()} as any;
    }

    protected _onConfigChanges(){
        if(!this.config) return;
        if(!this.config.entity) this.isCreateForm = true;
        this.form = this._initalizeForm(this.config);
    }
  
}