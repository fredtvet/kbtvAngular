import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Model } from 'src/app/core/models';
import { ModelFormStore } from 'src/app/core/services/model/form/model-form.store';
import { SimpleNavConfig } from 'src/app/shared/components/simple-top-nav/simple-nav-config.interface';
import { translations } from 'src/app/shared/translations';
import { BaseFormSheetWrapperComponent } from '../../../form/abstracts/base-form-sheet-wrapper.component';
import { StateAction } from '../../../state/state-action.enum';
import { ConfirmDialogService } from '../../../ui/confirm-dialog.service';
import { ModelStateConfig } from '../../model-state.config';
import { GenericModelFormConfig } from '../interfaces/generic-model-form-config.interface';
import { ModelFormViewConfig } from '../interfaces/model-form-view-config.interface';
import { ModelFormWrapperConfig } from '../interfaces/model-form-wrapper-config.interface';
import { ModelFormComponent } from './model-form.component';

type FormConfig = GenericModelFormConfig<Model, any, ModelFormViewConfig<Model, any>>
type WrapperFormConfig = ModelFormWrapperConfig<FormConfig>

@Component({
    selector: '',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelFormSheetWrapperComponent extends BaseFormSheetWrapperComponent<WrapperFormConfig> {

  private readonly formConfig = this.config?.formConfig;

  private translatedProp: string;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    router: Router,
    _bottomSheetRef: MatBottomSheetRef<any>,  
    private confirmService: ConfirmDialogService,  
    private store: ModelFormStore,
    @Inject(MAT_BOTTOM_SHEET_DATA) config: WrapperFormConfig) { 
        super(componentFactoryResolver, viewContainerRef, router, _bottomSheetRef, config) 
    }

    private confirmDelete = () => { 
        this.confirmService.open({
            message: `Slett ${this.translatedProp}?`, confirmText: 'Slett',
            confirmCallback: this.deleteEntity
        });
    }

    private deleteEntity = () => {
        this.close(StateAction.Delete)
        this.store?.delete({id: this.formConfig.entityId, stateProp: this.formConfig.stateProp});
    };

    protected loadForm(){
        this.config.formComponent = this.config.formComponent || ModelFormComponent;
        super.loadForm();
    }

    protected get navConfig(): SimpleNavConfig {
        const modelCfg = ModelStateConfig.get(this.config?.formConfig?.stateProp);
        this.translatedProp = translations[modelCfg.foreignProp]?.toLowerCase();

        return {
            title: this.config?.customTitle || `${this.formConfig.entityId ? "Oppdater" : "Registrer"} ${this.translatedProp}`,
            leftBtn: {icon: 'close', callback: this.close},
            buttons: [
                (this.config?.deleteDisabled || !this.formConfig.entityId) ? null : {icon: 'delete_forever', callback: this.confirmDelete}
            ]
        }
    }
}
