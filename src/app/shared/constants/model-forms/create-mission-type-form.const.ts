import { MissionType } from 'src/app/core/models';
import { DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { NameControl } from '../common-controls.const';

export const CreateMissionTypeForm: DynamicForm<MissionType, any> = {
    submitText: "Legg til", controls: [ {...NameControl, required: true} ],
}