import { AppDocumentType } from 'src/app/core/models';
import { DynamicForm } from '../../dynamic-form/interfaces';
import { NameControl } from '../common-controls.const';

export const CreateDocumentTypeForm: DynamicForm<AppDocumentType, any> = {
    submitText: "Legg til", controls: [{...NameControl, required: true}],
}