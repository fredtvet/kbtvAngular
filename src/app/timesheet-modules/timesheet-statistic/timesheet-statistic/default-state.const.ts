import { GroupByPeriod } from 'src/app/shared/enums';
import { ComponentStoreState } from '../store-state';

export const DefaultComponentState: Partial<ComponentStoreState> = {
    timesheetGroupBy: GroupByPeriod.Month,
}