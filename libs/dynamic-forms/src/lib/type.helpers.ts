import { UnknownState } from "global-types"
import { DeepRequired } from "ts-essentials"
import { DynamicControlGroup, FormStateBinding, FormStateBindingSetter, FormStateSetter, FormStateSetterFn, ValidControl, ValidFormSlice, ValidStateSlice } from "./interfaces"

export function _formStateSetter<TForm extends object, TFormState extends object | null, TInputState extends object | null = TFormState>(): 
<TFormSlice extends string, TStateSlice extends string>(
    formSlice: ValidFormSlice<DeepRequired<TForm>, TFormSlice>[],      
    stateSlice: ValidStateSlice<TInputState, TStateSlice>[],
    setter: FormStateSetterFn<TForm, TFormState, TInputState, TFormSlice, TStateSlice>,
    keepActive?: boolean
 ) => FormStateSetter<TForm, TFormState, TInputState, TFormSlice, TStateSlice> {

    return <TFormSlice extends string, TStateSlice extends string>(
        formSlice: ValidFormSlice<DeepRequired<TForm>, TFormSlice>[],      
        stateSlice: ValidStateSlice<TInputState, TStateSlice>[],
        setter: FormStateSetterFn<TForm, TFormState, TInputState, TFormSlice, TStateSlice>,
        keepActive: boolean = true
    ): FormStateSetter<TForm, TFormState, TInputState, TFormSlice, TStateSlice> => {
        return { formSlice, stateSlice, setter, keepActive }
    } 
 
}

export function _formStateBinding<TState extends object | null, TOutput>(): 
    <TSlice extends string>(
        props: ValidStateSlice<TState, TSlice>[],
        setter: FormStateBindingSetter<TState, TSlice, TOutput>
    ) => FormStateBinding<TState, TSlice, TOutput> {

    return <TSlice extends string>(
        props: ValidStateSlice<TState, TSlice>[],
        setter: FormStateBindingSetter<TState, TSlice, TOutput>
    ): FormStateBinding<TState, TSlice, TOutput>  => {
        return { props, setter }
    }
    
}

export function _isControlGroup(control: ValidControl<any>): control is DynamicControlGroup<UnknownState, UnknownState> {
    return (control as DynamicControlGroup<UnknownState, UnknownState>).controls !== undefined;
}

export function _isFormStateSetter(setter: unknown): setter is FormStateSetter<object, object | null, object | null, string, string> {
    return (setter as FormStateSetter<object, object | null, object | null, string, string>).setter !== undefined
    && (setter as FormStateSetter<object, object | null, object | null, string, string>).stateSlice !== undefined 
    && (setter as FormStateSetter<object, object | null, object | null, string, string>).formSlice !== undefined; 
}
export function _isFormStateBinding(binding: unknown): binding is FormStateBinding<object, string, unknown> {
    return (binding as FormStateBinding<object, string, unknown>).setter !== undefined
        && (binding as FormStateBinding<object, string, unknown>).props !== undefined  
}