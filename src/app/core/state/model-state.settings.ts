import { ModelState } from './global.state';
import { ApiUrl } from '../api-url';

export interface ModelPropertySettings { 
    apiUrl: ApiUrl, identifier: string, notPersisted?: boolean
}

export const ModelStateSettings: {[key in keyof ModelState]: ModelPropertySettings} = {
    missions: {apiUrl: ApiUrl.Mission, identifier: "id"},
    missionTypes: {apiUrl: ApiUrl.MissionType, identifier: "id"},
    employers: {apiUrl: ApiUrl.Employer, identifier: "id"},
    inboundEmailPasswords: {apiUrl: ApiUrl.InboundEmailPassword, identifier: "id", notPersisted: true},
    documentTypes: {apiUrl: ApiUrl.DocumentType, identifier: "id"}, 
    missionImages:  {apiUrl: ApiUrl.MissionImage, identifier: "id"},    
    missionDocuments:  {apiUrl: ApiUrl.MissionDocument, identifier: "id"},    
    missionNotes:  {apiUrl: ApiUrl.MissionNote, identifier: "id"},
    users: {apiUrl: ApiUrl.Users, identifier: "userName", notPersisted: true},   
    userTimesheets: {apiUrl: ApiUrl.UserTimesheet, identifier: "id"},    
    timesheets: {apiUrl: ApiUrl.Timesheet, identifier: "id", notPersisted: true}, 
}