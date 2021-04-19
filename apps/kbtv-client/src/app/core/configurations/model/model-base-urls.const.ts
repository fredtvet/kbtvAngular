import { ApiUrl } from "@core/api-url.enum";
import { ModelState } from "@core/state/model-state.interface";

export const ModelBaseUrls: Record<keyof ModelState, string> = {
    missions: ApiUrl.Mission,
    missionImages: ApiUrl.MissionImage,
    missionDocuments: ApiUrl.MissionDocument,
    missionNotes: ApiUrl.MissionNote,
    employers: ApiUrl.Employer,
    missionTypes: ApiUrl.MissionType,
    timesheets: ApiUrl.Timesheet,
    userTimesheets: ApiUrl.UserTimesheet,
    users: ApiUrl.Users,
    inboundEmailPasswords: ApiUrl.InboundEmailPassword
}