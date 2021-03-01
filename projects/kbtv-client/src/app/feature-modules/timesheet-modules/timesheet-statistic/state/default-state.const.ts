import { GroupByPeriod } from '@shared/enums';
import { StoreState } from './store-state';

export const DefaultState: Partial<StoreState> = {
    timesheetStatisticGroupBy: GroupByPeriod.Month,
}