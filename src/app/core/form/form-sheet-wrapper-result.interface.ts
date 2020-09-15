import { StateAction } from '../state';

export interface FormSheetWrapperResult{
    action: StateAction;
    hasNavigated: boolean;
}