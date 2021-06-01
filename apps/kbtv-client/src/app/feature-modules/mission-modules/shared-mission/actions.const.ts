import { StateAction } from "state-management";

export const CreateMissionImagesAction = "CREATE_MISSION_IMAGES_ACTION";
export interface CreateMissionImagesAction extends StateAction<typeof CreateMissionImagesAction> {
    files: Record<number, File>;
    missionId: string;
}