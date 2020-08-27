import { Mission } from 'src/app/core/models';
import { FormConfig } from 'src/app/shared/interfaces';

export interface TimesheetFormConfig extends FormConfig{
    date?: Date;
    mission?: Mission;
}