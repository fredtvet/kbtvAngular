import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseFormViewComponent<TConfig, TResponse> {
        
    private _config: TConfig;
    get config(): TConfig { return this._config; }
  
    @Input() set config(value: TConfig) {
        this._config = value;
        this._onConfigChanges();
    }

    @Output() formSubmitted = new EventEmitter<TResponse>();
  
    form: FormGroup;

    constructor() {}
  
    onSubmit = () => {
        if(this.form.valid && this.form.dirty && this._addSubmitChecks()) 
            this.formSubmitted.emit(this._convertFormDataToResponse());
    };

    protected _addSubmitChecks = (): boolean => true;
  
    protected _initalizeForm(cfg: TConfig): FormGroup{ 
        console.error("Method not implemented");
        return null;
    }

    protected _convertFormDataToResponse(): TResponse{
        return this.form.value;
    }

    protected _onConfigChanges(){
        if(!this.config) return;
        this.form = this._initalizeForm(this.config);
    }
  
  
}