import { StateAction } from "state-management";

export const UpdateLastVisitedAction = "UPDATE_LAST_VISITED_ACTION";
export interface UpdateLastVisitedAction extends StateAction {
    id: string
}

export const CreateMissionImagesAction = "CREATE_MISSION_IMAGES_ACTION";
export interface CreateMissionImagesAction extends StateAction {
    files: Record<number, File>;
    missionId: string;
}