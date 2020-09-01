import { ModelState } from './global.state';
import { ApiUrl } from '../api-url.enum';

export interface ModelPropertyConfig { 
    apiUrl: ApiUrl, 
    identifier: string, 
    notPersisted?: boolean, 
    modelProp?: string,
    fkProp?: string,
    children?: Extract<keyof ModelState, string>[],
    foreignKeys?: Extract<keyof ModelState, string>[]
}

export const ModelStateConfig: {[key in Extract<keyof ModelState, string>]: ModelPropertyConfig} = {
    missions: {
        apiUrl: ApiUrl.Mission, 
        identifier: "id", 
        modelProp: "mission",
        fkProp: "missionId",
        children: ["missionImages", "missionDocuments", "missionNotes"], 
        foreignKeys: ["missionTypes","employers"],       
    },
    missionTypes: {
        apiUrl: ApiUrl.MissionType, 
        identifier: "id",    
        modelProp: "missionType",
        fkProp: "missionTypeId",
    },
    employers: {
        apiUrl: ApiUrl.Employer, 
        identifier: "id",    
        modelProp: "employer",
        fkProp: "employerId",
    },
    documentTypes: {
        apiUrl: ApiUrl.DocumentType, 
        identifier: "id",    
        modelProp: "documentType",
        fkProp: "documentTypeId",
    }, 
    missionImages:  {
        apiUrl: ApiUrl.MissionImage, 
        identifier: "id",    
        modelProp: "missionImage",
        fkProp: "missionImageId",
    },    
    missionDocuments:  {
        apiUrl: ApiUrl.MissionDocument, 
        identifier: "id", 
        modelProp: "missionDocument",
        fkProp: "missionDocumentId",
        foreignKeys: ["documentTypes"]
    },    
    missionNotes:  {
        apiUrl: ApiUrl.MissionNote, 
        identifier: "id",    
        modelProp: "missionNote",
        fkProp: "missionNoteId",
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
        identifier: "id"
    },    
    timesheets: {
        apiUrl: ApiUrl.Timesheet, 
        identifier: "id", 
        notPersisted: true
    }, 
}