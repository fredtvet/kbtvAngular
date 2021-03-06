import { MissionType } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { NameControl } from '@shared/constants/common-controls.const';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';

export interface CreateMissionTypeForm extends Pick<MissionType, "name"> {}

export const CreateMissionTypeModelForm: Immutable<ModelFormConfig<ModelState, MissionType, CreateMissionTypeForm>> = {
    includes: {prop: "missionTypes"}, 
    dynamicForm: {
        submitText: "Legg til",
        controls: { name: {...NameControl, required: true} } 
    }
}