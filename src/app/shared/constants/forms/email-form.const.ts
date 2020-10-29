import { DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { EmailControl } from '../common-controls.const';

export interface EmailForm { email: string };

export const EmailForm: DynamicForm<EmailForm, any> = {
    submitText: "Send", controls: [{...EmailControl, required: true}],
}