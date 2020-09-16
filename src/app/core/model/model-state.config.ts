
import { ApiUrl } from '../api-url.enum';
import { ModelState } from './model.state';
import { StateProp } from './state.types';

export interface ModelConfig<TState> { 
    apiUrl: ApiUrl, 
    identifier: string, 
    notPersisted?: boolean, 
    foreignProp?: string,
    foreignKey?: string,
    displayProp?: string,
    children?: StateProp<TState>[],
    foreigns?: StateProp<TState>[]
}

export class ModelStateConfig {
    static get<TState>(prop: StateProp<TState>): ModelConfig<TState>{
        const cfg = ModelStateConfigData[prop];
        if(!cfg) console.error(`No model state config for property ${prop}`);
        return cfg as any;
    }
}

export const ModelStateConfigData: {[key in keyof ModelState]: ModelConfig<ModelState>} = {
    missions: {
        apiUrl: ApiUrl.Mission, 
        identifier: "id", 
        displayProp: "address",
        foreignProp: "mission",
        foreignKey: "missionId",
        children: ["missionImages", "missionDocuments", "missionNotes"], 
        foreigns: ["missionTypes","employers"],       
    },
    missionTypes: {
        apiUrl: ApiUrl.MissionType, 
        identifier: "id", 
        displayProp: "name",   
        foreignProp: "missionType",
        foreignKey: "missionTypeId",
    },
    employers: {
        apiUrl: ApiUrl.Employer, 
        identifier: "id",  
        displayProp: "name",    
        foreignProp: "employer",
        foreignKey: "employerId",
    },
    documentTypes: {
        apiUrl: ApiUrl.DocumentType, 
        identifier: "id",   
        displayProp: "name",   
        foreignProp: "documentType",
        foreignKey: "documentTypeId",
    }, 
    missionImages:  {
        apiUrl: ApiUrl.MissionImage, 
        identifier: "id",  
        displayProp: "fileName",    
        foreignProp: "missionImage",
        foreignKey: "missionImageId",
    },    
    missionDocuments:  {
        apiUrl: ApiUrl.MissionDocument, 
        identifier: "id", 
        displayProp: "fileName",   
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
        notPersisted: true,
        foreignProp: "user",
        foreignKey: "userName",     
        foreigns: ["employers"]
    },      
    inboundEmailPasswords: {
        apiUrl: ApiUrl.InboundEmailPassword, 
        identifier: "id", 
        displayProp: "password",      
        foreignProp: "inboundEmailPassword",   
        foreignKey: "inboundEmailPasswordId",      
        notPersisted: true,    
    }, 
    userTimesheets: {
        apiUrl: ApiUrl.UserTimesheet, 
        identifier: "id",
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions", "users"],  
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