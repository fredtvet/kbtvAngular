import { GroupByPeriod } from "@shared-app/enums/group-by-period.enum";
import { StateAction } from "state-management";

export const SetGroupByAction = "SET_GROUP_BY_ACTION";
export interface SetGroupByAction extends StateAction<typeof SetGroupByAction> {
    groupBy: GroupByPeriod
}
