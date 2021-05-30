import { GroupByPeriod } from '@shared-app/enums/group-by-period.enum';
import { StoreState } from './store-state';

export const DefaultState: Partial<StoreState> = {
    timesheetStatisticGroupBy: GroupByPeriod.Month,
}