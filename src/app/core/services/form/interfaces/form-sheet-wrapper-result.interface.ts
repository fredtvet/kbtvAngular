import { StateAction } from '../../state/state-action.enum';

export interface FormSheetWrapperResult{
    action: StateAction;
    hasNavigated: boolean;
}