import { Directive } from "@angular/core";
import { Model } from 'src/app/core/models';
import { BaseFormViewComponent } from '../../../form/abstracts/base-form-view-component';
import { ModelFormViewConfig } from '../interfaces/model-form-view-config.interface';

@Directive()
export abstract class BaseModelFormViewComponent<
    TFormState, 
    TModel extends Model, 
    TConfig extends ModelFormViewConfig<TModel, TFormState>> 
    extends BaseFormViewComponent<TConfig, TFormState> {

    isCreateForm = false;

    constructor() { super(); }
  
    protected _convertFormDataToResponse(): TFormState {
        return this.form.getRawValue()
    }

    protected _onConfigChanges(){
        if(!this.config) return;
        if(!this.config.entity) this.isCreateForm = true;
        this.form = this._initalizeForm(this.config);
    }
  
}