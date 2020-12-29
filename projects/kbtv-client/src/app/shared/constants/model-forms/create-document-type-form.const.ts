import { AppDocumentType } from '@core/models';
import { DynamicForm } from 'dynamic-forms';
import { NameControl } from '../common-controls.const';

export const CreateDocumentTypeForm: DynamicForm<AppDocumentType, unknown> = {
    submitText: "Legg til", controls: [{...NameControl, required: true}],
}