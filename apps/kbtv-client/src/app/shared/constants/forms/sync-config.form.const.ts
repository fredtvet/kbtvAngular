import { Validators } from '@angular/forms';
import { DefaultState } from '@core/configurations/default-state.const';
import { IonDateQuestion, IonDateQuestionComponent } from '@shared/scam/dynamic-form-questions/ion-date-time-question.component';
import { _getDateYearsAgo, _getFirstDayOfMonth, _getISO } from 'date-time-helpers';
import { DynamicForm } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { SyncConfig } from 'state-sync';
import { SliderQuestion, SliderQuestionComponent } from '../../scam/dynamic-form-questions/slider-question.component';

export const SyncConfigForm: Immutable<DynamicForm<SyncConfig, unknown>> = {
    submitText: "Lagre", resettable: true, 
    resetState: {...DefaultState.syncConfig, refreshTime: DefaultState.syncConfig.refreshTime / 60}, 
    onSubmitFormatter: (cfg, state) => { 
        return {...cfg, initialTimestamp: _getFirstDayOfMonth(cfg.initialTimestamp).getTime() }
    },
    controls: [
        { name: "refreshTime", required: true,
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
        { name: "initialTimestamp", required: true, 
            valueGetter: (s: SyncConfig) => s.initialTimestamp ? _getISO(s.initialTimestamp) : null,
            type: "control", questions: [{
                component:  IonDateQuestionComponent,
                question: <IonDateQuestion>{
                    placeholder: "Synkroniseringsdato", 
                    hint: "Hvor gammel data skal lastes inn? Kun data opprettet eller oppdatert etter gitt dato lastes inn.",
                    // width: "42%",
                    ionFormat:"YYYY-MMMM",
                    min: _getISO(_getDateYearsAgo(4)),
                    max: _getISO(new Date()),
                    datePipeFormat: "MMMM, y",
                }, 
            }], 
        } ,
    ],
}