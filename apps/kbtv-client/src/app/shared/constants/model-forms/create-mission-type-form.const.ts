import { MissionType } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { NameControl } from '../common-controls.const';

export const CreateMissionTypeModelForm: Immutable<ModelFormConfig<ModelState, MissionType>> = {
    includes: {prop: "missionTypes"},
    actionConverter: _formToSaveModelConverter,
    dynamicForm: {
        submitText: "Legg til", 
        controls: [ {...NameControl, required: true} ],
    }
}