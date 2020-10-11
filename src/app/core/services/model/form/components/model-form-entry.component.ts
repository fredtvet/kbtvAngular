import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { BaseFormEntryComponent } from '../../../form/abstracts/base-form-entry.component';
import { FormComponent } from '../../../form/interfaces/form-component.interface';
import { FormSheetWrapperConfig } from '../../../form/interfaces/form-sheet-wrapper-config.interface';
import { ModelFormService } from '../model-form.service';

@Component({
    selector: '',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelFormEntryComponent<TWrapperConfig extends FormSheetWrapperConfig<any, FormComponent>>
    extends BaseFormEntryComponent<TWrapperConfig> {

    constructor(
        formService: ModelFormService,
        route: ActivatedRoute,
        location: Location,
    ) {          
        super(formService, route, location);
    }

    protected modifyConfig(config: TWrapperConfig, routeData: Data): TWrapperConfig{
        config.formComponent = routeData?.formComponent;
        if(!config.formConfig) config.formConfig = {};
        config.formConfig.viewComponent = routeData?.viewComponent;
        config.formConfig.adapter = routeData?.adapter;
        config.formConfig.stateProp = routeData?.stateProp; 
        return config;
    }
}