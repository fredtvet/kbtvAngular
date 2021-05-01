import { DynamicForm } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { EmailControl } from '../common-controls.const';

export interface EmailForm { email: string };

export const EmailForm: Immutable<DynamicForm<EmailForm, null>> = {
    submitText: "Send",
    controls: { email: {...EmailControl, required: true} },
}