import { MissionType } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelConverter } from '@shared/action-converters/form-to-save-model.converter';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { NameControl } from '../common-controls.const';

export interface CreateMissionTypeForm extends Pick<MissionType, "name"> {}

export const CreateMissionTypeModelForm: Immutable<ModelFormConfig<ModelState, CreateMissionTypeForm, MissionType>> = {
    includes: {prop: "missionTypes"}, 
    actionConverter: _formToSaveModelConverter,
    dynamicForm: {
        submitText: "Legg til",
        controls: { name: {...NameControl, required: true} } 
    }
}