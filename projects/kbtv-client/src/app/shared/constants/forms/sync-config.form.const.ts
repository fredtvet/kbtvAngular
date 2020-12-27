import { Validators } from '@angular/forms';
import { SyncConfig } from '@sync/interfaces';
import { DynamicControl, DynamicForm } from '@dynamic-forms/interfaces';
import { DefaultState } from '@shared-app/const/default-state.const';
import { SliderQuestion, SliderQuestionComponent } from '../../components/dynamic-form-questions/slider-question.component';

export const SyncConfigForm: DynamicForm<SyncConfig, unknown> = {
    submitText: "Lagre", resettable: true, 
    resetState: {...DefaultState.syncConfig, refreshTime: DefaultState.syncConfig.refreshTime / 60}, 
    controls: [
        <DynamicControl<SyncConfig>>{ name: "refreshTime", required: true,
            valueGetter: (s: SyncConfig) => s.refreshTime,
            type: "control", questions: [{
                component:  SliderQuestionComponent,
                question: <SliderQuestion>{
                    label: "Synkroniseringstid",
                    hint: "Hvor ofte skal det sjekkes etter oppdatert data?",
                    valueSuffix: "min", 
                    min: 3, max: 60, tickInterval: 5, thumbLabel: true
                }, 
            }], 
            validators: [Validators.min(1)] 
        },
        <DynamicControl<SyncConfig>>{ name: "initialNumberOfMonths", required: true,
        valueGetter: (s: SyncConfig) => s.initialNumberOfMonths,
        type: "control", questions: [{
            component:  SliderQuestionComponent,
            question: <SliderQuestion>{
                label: "Antall måneder med data",
                hint: "Hvor mange måneder med data skal lastes inn?",
                valueSuffix: "mnd", 
                min: 4, max: 80, tickInterval: 4, thumbLabel: true
            }, 
        }], 
        validators: [Validators.min(1)] 
        }
    ],
}