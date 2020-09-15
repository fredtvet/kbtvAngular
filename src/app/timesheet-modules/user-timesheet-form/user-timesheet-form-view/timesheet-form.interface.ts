import { Mission } from 'src/app/core/models';

export interface TimesheetForm {
    id: string;
    date?: Date;
    mission?: Mission;
    timeRange?: Date[];
    comment?: string;
}