import { CheckboxQuestion, CheckboxQuestionComponent } from '@shared/components/dynamic-form-questions/checkbox-question.component';
import { translations } from '@shared/translations';
import { DynamicForm } from 'dynamic-forms';
import { Prop, UnknownState } from 'global-types';

export function _createMultiCheckboxForm<TState = UnknownState>(
    keys: Prop<TState>[], 
    baseForm?: Partial<DynamicForm<Record<Prop<TState>, boolean>, {}>>,
    selectAll?: boolean): DynamicForm<Record<Prop<TState>, boolean>, {}>{

    const form: DynamicForm<Record<Prop<TState>, boolean>, {}> = {
        submitText: "Lagre", controls: [], ...(baseForm || {})
    };

    for(const key of keys){
        form.controls.push({
            name: key, type: "control", 
            valueGetter: form.initialValue ? (<Record<Prop<TState>, boolean>> form.initialValue)[key] : selectAll, 
            questions: [{
                component:  CheckboxQuestionComponent,
                question: <CheckboxQuestion>{   
                    text: translations[key.toLowerCase()] || key, 
                }, 
            }], 
        })
    }

    return form;
}