import { GroupByPeriod } from '@shared/enums';
import { ComponentStoreState } from '../store-state';

export const DefaultComponentState: Partial<ComponentStoreState> = {
    timesheetGroupBy: GroupByPeriod.Month,
}