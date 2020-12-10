import { Reducer } from '@state/interfaces';
import { _deleteModelWithChildren } from '../../helpers/delete-model-with-children.helper';
import { ModelStateConfig } from '../../model-state.config';
import { DeleteModelActionId, DeleteModelStateCommand } from './delete-model-action.const';

export const DeleteModelReducer: Reducer<any, DeleteModelStateCommand<any>> = {
    actionId: DeleteModelActionId,
    reducerFn: (state: any, action: DeleteModelStateCommand<any>) => _deleteModelWithChildren(state, action.stateProp, action),
    stateProperties: _statePropertiesGetter
}

function _statePropertiesGetter(command: DeleteModelStateCommand<any>): string[]{
    const modelConfig = ModelStateConfig.get(command.stateProp);

    let stateProps: any[] = [command.stateProp];

    if(modelConfig.children) 
        stateProps = stateProps.concat(modelConfig.children);

    return stateProps;
}