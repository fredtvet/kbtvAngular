import { ModelState } from './global.state';
import { ApiUrl } from '../api-url.enum';

export interface ModelPropertyConfig { 
    apiUrl: ApiUrl, 
    identifier: string, 
    notPersisted?: boolean, 
    foreignProp?: string,
    foreignKey?: string,
    children?: (Extract<keyof Partial<ModelState>, string>)[],
    foreigns?: (Extract<keyof Partial<ModelState>, string>)[]
}

export const ModelStateConfig: {[key in Extract<keyof ModelState, string>]: ModelPropertyConfig} = {
    missions: {
        apiUrl: ApiUrl.Mission, 
        identifier: "id", 
        foreignProp: "mission",
        foreignKey: "missionId",
        children: ["missionImages", "missionDocuments", "missionNotes"], 
        foreigns: ["missionTypes","employers"],       
    },
    missionTypes: {
        apiUrl: ApiUrl.MissionType, 
        identifier: "id",    
        foreignProp: "missionType",
        foreignKey: "missionTypeId",
    },
    employers: {
        apiUrl: ApiUrl.Employer, 
        identifier: "id",    
        foreignProp: "employer",
        foreignKey: "employerId",
    },
    documentTypes: {
        apiUrl: ApiUrl.DocumentType, 
        identifier: "id",    
        foreignProp: "documentType",
        foreignKey: "documentTypeId",
    }, 
    missionImages:  {
        apiUrl: ApiUrl.MissionImage, 
        identifier: "id",    
        foreignProp: "missionImage",
        foreignKey: "missionImageId",
    },    
    missionDocuments:  {
        apiUrl: ApiUrl.MissionDocument, 
        identifier: "id", 
        foreignProp: "missionDocument",
        foreignKey: "missionDocumentId",
        foreigns: ["documentTypes"]
    },    
    missionNotes:  {
        apiUrl: ApiUrl.MissionNote, 
        identifier: "id",    
        foreignProp: "missionNote",
        foreignKey: "missionNoteId",
    },
    users: {
        apiUrl: ApiUrl.Users, 
        identifier: "userName", 
        notPersisted: true
    },      
    inboundEmailPasswords: {
        apiUrl: ApiUrl.InboundEmailPassword, 
        identifier: "id", 
        notPersisted: true,    
    }, 
    userTimesheets: {
        apiUrl: ApiUrl.UserTimesheet, 
        identifier: "id",
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions"],  
    },    
    timesheets: {
        apiUrl: ApiUrl.Timesheet, 
        identifier: "id", 
        notPersisted: true,
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions"],  
    }, 
}