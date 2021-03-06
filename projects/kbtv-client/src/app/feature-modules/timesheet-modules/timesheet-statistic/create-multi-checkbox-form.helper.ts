import { CheckboxQuestion, CheckboxQuestionComponent } from '@shared/components/dynamic-form-questions/checkbox-question.component';
import { DynamicForm } from 'dynamic-forms';
import { Prop, UnknownState } from 'global-types';

export interface KeyOptions<TState = UnknownState> { key: Prop<TState>, text: string }

export function _createMultiCheckboxForm<TState = UnknownState>(
    keys: KeyOptions<TState>[], 
    baseForm?: Partial<DynamicForm<Record<Prop<TState>, boolean>, {}>>,
    selectAll?: boolean): DynamicForm<Record<Prop<TState>, boolean>, {}>{

    const form: DynamicForm<Record<Prop<TState>, boolean>, {}> = {
        submitText: "Lagre", controls: [], ...(baseForm || {})
    };

    for(const keyOptions of keys){
        form.controls.push({
            name: keyOptions.key, type: "control", 
            valueGetter: form.initialValue ? (<Record<Prop<TState>, boolean>> form.initialValue)[keyOptions.key] : selectAll, 
            questions: [{
                component:  CheckboxQuestionComponent,
                question: <CheckboxQuestion>{   
                    text: keyOptions.text || keyOptions.key, 
                }, 
            }], 
        })
    }

    return form;
}