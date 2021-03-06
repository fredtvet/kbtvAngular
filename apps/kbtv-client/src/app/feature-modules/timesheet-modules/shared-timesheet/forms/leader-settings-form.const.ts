import { LeaderSettings } from '@core/models/leader-settings.interface';
import { CheckboxQuestion, CheckboxQuestionComponent } from '@shared/scam/dynamic-form-questions/checkbox-question.component';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { FormSheetViewConfig } from 'form-sheet';
import { Immutable } from 'global-types';

export const LeaderSettingsForm: Immutable<DynamicForm<LeaderSettings, null>> = {
    submitText: "Lagre", options: { onlineRequired: true },
    controls: {
        confirmTimesheetsMonthly: <Immutable<DynamicControl<boolean, null, CheckboxQuestion>>>{ 
            questionComponent: CheckboxQuestionComponent, 
            question: { text: "Lås timer automatisk hver måned" }
        },
    },
}

export const LeaderSettingsFormSheet: Immutable<FormSheetViewConfig<LeaderSettings>> = {
    formConfig: LeaderSettingsForm,
    navConfig: { title: "Innstillinger" },
    fullScreen: false
}
