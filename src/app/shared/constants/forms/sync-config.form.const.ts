import { Validators } from '@angular/forms';
import { SyncStoreConfig } from 'src/app/core/services/sync';
import { DefaultSyncConfig } from 'src/app/core/services/sync/default-sync-config.const';
import { DynamicForm, DynamicControl } from 'src/app/dynamic-forms/interfaces';
import { SliderQuestionComponent, SliderQuestion } from '../../components/dynamic-form-questions/slider-question.component';

export const SyncConfigForm: DynamicForm<SyncStoreConfig, any> = {
    submitText: "Lagre", resettable: true, 
    resetState: {...DefaultSyncConfig, refreshTime: DefaultSyncConfig.refreshTime / 60}, 
    controls: [
        <DynamicControl<SyncStoreConfig, any>>{ name: "refreshTime", required: true,
            valueGetter: (s: SyncStoreConfig) => s.refreshTime,
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
        <DynamicControl<SyncStoreConfig, any>>{ name: "initialNumberOfMonths", required: true,
        valueGetter: (s: SyncStoreConfig) => s.initialNumberOfMonths,
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