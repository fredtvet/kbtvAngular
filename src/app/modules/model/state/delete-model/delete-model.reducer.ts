import { Reducer } from '@state/interfaces';
import { _deleteModelWithChildren } from '../../helpers/delete-model-with-children.helper';
import { ModelStateConfig } from '../../model-state.config';
import { DeleteModelAction } from './delete-model.action';

export const DeleteModelReducer: Reducer<any, DeleteModelAction<any>> = {
    action: DeleteModelAction,
    reducerFn: (state: any, action: DeleteModelAction<any>) => _deleteModelWithChildren(state, action.stateProp, action.payload),
    stateProperties: _statePropertiesGetter
}

function _statePropertiesGetter(command: DeleteModelAction<any>): string[]{
    const modelConfig = ModelStateConfig.get(command.stateProp);

    let stateProps: any[] = [command.stateProp];

    if(modelConfig.children) 
        stateProps = stateProps.concat(modelConfig.children);

    return stateProps;
}