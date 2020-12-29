import { MissionType } from '@core/models';
import { DynamicForm } from 'dynamic-forms';
import { NameControl } from '../common-controls.const';

export const CreateMissionTypeForm: DynamicForm<MissionType, unknown> = {
    submitText: "Legg til", controls: [ {...NameControl, required: true} ],
}