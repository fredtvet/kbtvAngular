import { CheckboxQuestion, CheckboxQuestionComponent } from '@shared/scam/dynamic-form-questions/checkbox-question.component';
import { DynamicForm } from 'dynamic-forms';
import { Immutable, Prop, UnknownState } from 'global-types';

export interface MultiCheckboxForm<TState> { selections: Record<Prop<TState>, boolean> }

export interface KeyOptions<TState = UnknownState> { key: Prop<TState>, text: string }

export function _createMultiCheckboxForm<TState extends object = object>(
    keys: KeyOptions<TState>[], 
    baseForm?: Partial<Omit<DynamicForm<MultiCheckboxForm<TState>, null>, "controls">>
): Immutable<DynamicForm<MultiCheckboxForm<TState>, null>> {

    let controls: Partial<Record<Prop<TState>, object>> = { }

    for(const keyOptions of keys){
        controls[keyOptions.key] = {
            questionComponent:  CheckboxQuestionComponent,
            question: <CheckboxQuestion>{   
                width: "45%",
                text: keyOptions.text || keyOptions.key, 
            }, 
        }
    }

    return <Immutable<DynamicForm<MultiCheckboxForm<TState>, null>>> {
        submitText: "Lagre", 
        controls: {
            selections: {
                controls,
                label: "Velg kolonner",
                panelClass: "multi-checkbox-group"
            }
        },    
        ...(baseForm || {}),
    };
}