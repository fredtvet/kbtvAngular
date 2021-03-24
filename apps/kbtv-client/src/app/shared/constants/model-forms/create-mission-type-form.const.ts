import { MissionType } from '@core/models';
import { DynamicForm } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { NameControl } from '../common-controls.const';

export const CreateMissionTypeForm: Immutable<DynamicForm<MissionType, unknown>> = {
    submitText: "Legg til", controls: [ {...NameControl, required: true} ],
}