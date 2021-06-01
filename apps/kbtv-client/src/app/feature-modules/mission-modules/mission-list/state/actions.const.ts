import { MissionCriteria } from "@shared/interfaces";
import { StateAction } from "state-management";

export const SetMissionCriteriaAction = "SET_MISSION_CRITERIA_ACTION";
export interface SetMissionCriteriaAction extends StateAction<typeof SetMissionCriteriaAction> {
    missionCriteria: MissionCriteria
}
export const UpdateLastVisitedAction = "UPDATE_LAST_VISITED_ACTION";
export interface UpdateLastVisitedAction extends StateAction<typeof UpdateLastVisitedAction> {
    id: string
}
