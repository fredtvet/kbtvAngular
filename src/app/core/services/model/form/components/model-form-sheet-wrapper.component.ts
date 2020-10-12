import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Model } from 'src/app/core/models';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { SimpleNavConfig } from 'src/app/shared/components/simple-top-nav/simple-nav-config.interface';
import { translations } from 'src/app/shared/translations';
import { BaseFormSheetWrapperComponent } from '../../../form/abstracts/base-form-sheet-wrapper.component';
import { CommandDispatcher } from '../../../state/command.dispatcher';
import { StateAction } from '../../../state/state-action.enum';
import { ConfirmDialogService } from '../../../ui/confirm-dialog.service';
import { ModelStateConfig } from '../../model-state.config';
import { DeleteModelAction, DeleteModelStateCommand } from '../../state/delete-model/delete-model-state-command.interface';
import { DeleteModelHttpEffect } from '../../state/delete-model/delete-model.http.effect';
import { DeleteModelReducer } from '../../state/delete-model/delete-model.reducer';
import { ModelFormConfig } from '../interfaces';
import { ModelFormViewConfig } from '../interfaces/model-form-view-config.interface';
import { ModelFormWrapperConfig } from '../interfaces/model-form-wrapper-config.interface';
import { ModelFormComponent } from './model-form.component';

type FormConfig = ModelFormConfig<Model, any, ModelFormViewConfig<Model, any>>
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
    deleteReducer: DeleteModelReducer, 
    deleteHttpEffect: DeleteModelHttpEffect,
    private confirmService: ConfirmDialogService,  
    private commandDispatcher: CommandDispatcher,
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
        this.close(StateAction.Delete);
        this.commandDispatcher.dispatch<DeleteModelStateCommand>({
            stateProp: this.formConfig.stateProp, 
            action: DeleteModelAction, 
            id: this.formConfig.entityId
        });
    };

    protected loadForm(){
        this.config.formComponent = this.config.formComponent || ModelFormComponent;
        super.loadForm();
    }

    protected get navConfig(): MainTopNavConfig {
        const modelCfg = ModelStateConfig.get(this.config?.formConfig?.stateProp);
        this.translatedProp = translations[modelCfg.foreignProp]?.toLowerCase();

        return {
            title: this.config?.customTitle || `${this.formConfig.entityId ? "Oppdater" : "Registrer"} ${this.translatedProp}`,
            backFn: this.close,
            backIcon: "close",
            buttons: [
                (this.config?.deleteDisabled || !this.formConfig.entityId) ? null : {icon: 'delete_forever', callback: this.confirmDelete}
            ]
        }
    }
}