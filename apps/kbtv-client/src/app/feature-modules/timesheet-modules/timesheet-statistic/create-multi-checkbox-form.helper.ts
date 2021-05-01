import { CheckboxQuestion, CheckboxQuestionComponent } from '@shared/scam/dynamic-form-questions/checkbox-question.component';
import { DynamicControl, DynamicControlGroup, DynamicForm } from 'dynamic-forms';
import { Immutable, Prop, UnknownState } from 'global-types';

interface MultiCheckboxForm<TState> { selections: Record<Prop<TState>, boolean> }

export interface KeyOptions<TState = UnknownState> { key: Prop<TState>, text: string }

export function _createMultiCheckboxForm<TState extends object = object>(
    keys: KeyOptions<TState>[], 
    baseForm?: Partial<Omit<DynamicForm<MultiCheckboxForm<TState>, null>, "controls">>,
    selectAll?: boolean): Immutable<DynamicForm<MultiCheckboxForm<TState>, null>> {

    let controls: DynamicControl<Record<Prop<TState>, boolean>, Prop<TState>>[] = []

    for(const keyOptions of keys){
        controls.push({
            name: keyOptions.key, type: "control", 
            valueFormatter: (val) => selectAll || val,
            questionComponent:  CheckboxQuestionComponent,
            question: <CheckboxQuestion>{   
                width: "45%",
                text: keyOptions.text || keyOptions.key, 
            }, 
        })
    }

    return <Immutable<DynamicForm<MultiCheckboxForm<TState>, null>>> {
        submitText: "Lagre", 
        controls: {
            selections: <DynamicControlGroup<MultiCheckboxForm<object>, "selections" >> {
                type: "group", name: "selections", 
                controls,
                label: "Velg kolonner",
                panelClass: "multi-checkbox-group"
            }
        },    
        ...(baseForm || {}),
    };
}