import { Location } from '@angular/common';
import { ActivatedRoute, Data } from '@angular/router';
import { BaseFormService } from '../base-form-service.interface';
import { FormComponent } from '../form-component.interface';
import { FormSheetWrapperConfig } from '../form-sheet-wrapper-config.interface';

export abstract class BaseFormEntryComponent<TWrapperConfig extends FormSheetWrapperConfig<any, FormComponent>> {

    constructor(
        private formService: BaseFormService,
        private route: ActivatedRoute, 
        private location: Location,
        ) {   

        let wrapperConfig =    
            this.route.snapshot.params['config'] ? JSON.parse(this.route.snapshot.params['config']) : {};

        let routeData = this.route.snapshot.data;

        let ref = this.formService.open(this.modifyConfig(wrapperConfig, routeData))
        ref.afterDismissed().subscribe(result => !result?.hasNavigated ? this.location.back() : null)
    }

    protected modifyConfig(config: TWrapperConfig, routeData: Data): TWrapperConfig{
        return config;
    }
}