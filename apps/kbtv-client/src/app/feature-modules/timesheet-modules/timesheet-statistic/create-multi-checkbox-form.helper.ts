import { CheckboxQuestion, CheckboxQuestionComponent } from '@shared/scam/dynamic-form-questions/checkbox-question.component';
import { DynamicControlGroup, DynamicForm } from 'dynamic-forms';
import { Immutable, Prop, UnknownState } from 'global-types';

export interface KeyOptions<TState = UnknownState> { key: Prop<TState>, text: string }

export function _createMultiCheckboxForm<TState = UnknownState>(
    keys: KeyOptions<TState>[], 
    baseForm?: Partial<DynamicForm<Record<Prop<TState>, boolean>, {}>>,
    selectAll?: boolean): Immutable<DynamicForm<Record<Prop<TState>, boolean>, {}>> {

    const form: DynamicForm<Record<Prop<TState>, boolean>, {}> = {
        submitText: "Lagre", controls: [], ...(baseForm || {})
    };

    const formGroup: DynamicControlGroup<Record<Prop<TState>, boolean>, {}> = {
        type: "group",
        controls: [],
        label: "Velg kolonner",
        panelClass: "multi-checkbox-group"
    }

    for(const keyOptions of keys){
        formGroup.controls.push({
            name: keyOptions.key, type: "control", 
            valueGetter: form.initialValue ? (<Record<Prop<TState>, boolean>> form.initialValue)[keyOptions.key] : selectAll, 
            questions: [{
                component:  CheckboxQuestionComponent,
                question: <CheckboxQuestion>{   
                    width: "45%",
                    text: keyOptions.text || keyOptions.key, 
                }, 
            }], 
        })
    }
    form.controls = [formGroup];

    return <Immutable<DynamicForm<Record<Prop<TState>, boolean>, {}>>> form;
}