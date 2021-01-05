import { ApiUrl } from '../api-url.enum';
import { Mission, MissionType, Employer, AppDocumentType, MissionImage, MissionDocument, MissionNote, User, InboundEmailPassword, Timesheet } from '../models';
import { ModelState } from '../state/model-state.interface';
import { ModelConfig } from 'state-model';

export const ModelConfigs: unknown[] = [
    <ModelConfig<Mission, ModelState>>{
        stateProp: "missions",
        apiUrl: ApiUrl.Mission, 
        identifier: "id", 
        displayProp: "address",
        foreignProp: "mission",
        foreignKey: "missionId",
        children: [
            {prop: "missionImages", cascadeDelete: true}, 
            {prop: "missionDocuments", cascadeDelete: true},
            {prop: "missionNotes", cascadeDelete: true}, 
            {prop: "timesheets"},
            {prop: "userTimesheets"},
        ], 
        foreigns: ["missionTypes","employers"],       
    },
    <ModelConfig<MissionType, ModelState>>{
        stateProp: "missionTypes",
        apiUrl: ApiUrl.MissionType, 
        identifier: "id", 
        displayProp: "name",   
        foreignProp: "missionType",
        foreignKey: "missionTypeId",
    },
    <ModelConfig<Employer, ModelState>>{
        stateProp: "employers",
        apiUrl: ApiUrl.Employer, 
        identifier: "id",  
        displayProp: "name",    
        foreignProp: "employer",
        foreignKey: "employerId",
    },
    <ModelConfig<AppDocumentType, ModelState>>{
        stateProp: "documentTypes",
        apiUrl: ApiUrl.DocumentType, 
        identifier: "id",   
        displayProp: "name",   
        foreignProp: "documentType",
        foreignKey: "documentTypeId",
    }, 
    <ModelConfig<MissionImage, ModelState>>{
        stateProp: "missionImages",
        apiUrl: ApiUrl.MissionImage, 
        identifier: "id",  
        displayProp: "fileName",    
        foreignProp: "missionImage",
        foreignKey: "missionImageId",
    },    
    <ModelConfig<MissionDocument, ModelState>>{
        stateProp: "missionDocuments",
        apiUrl: ApiUrl.MissionDocument, 
        identifier: "id", 
        displayProp: "fileName",   
        foreignProp: "missionDocument",
        foreignKey: "missionDocumentId",
        foreigns: ["documentTypes"]
    },    
    <ModelConfig<MissionNote, ModelState>>{
        stateProp: "missionNotes",
        apiUrl: ApiUrl.MissionNote, 
        identifier: "id",    
        displayProp: "id",  
        foreignProp: "missionNote",
        foreignKey: "missionNoteId",
    },
    <ModelConfig<User, ModelState>>{
        stateProp: "users",
        apiUrl: ApiUrl.Users, 
        identifier: "userName", 
        displayProp: "userName",  
        autoFetch: true,
        foreignProp: "user",
        foreignKey: "userName",     
        foreigns: ["employers"]
    },      
    <ModelConfig<InboundEmailPassword, ModelState>>{
        stateProp: "inboundEmailPasswords",
        apiUrl: ApiUrl.InboundEmailPassword, 
        identifier: "id", 
        displayProp: "password",      
        foreignProp: "inboundEmailPassword",   
        foreignKey: "inboundEmailPasswordId",      
        autoFetch: true,    
    }, 
    <ModelConfig<Timesheet, ModelState>>{
        stateProp: "userTimesheets",
        apiUrl: ApiUrl.UserTimesheet, 
        identifier: "id",
        displayProp: "id",  
        foreignProp: "userTimesheet",
        foreignKey: "userTimesheetId",
        foreigns: ["missions"],  
    },    
    <ModelConfig<Timesheet, ModelState>>{
        stateProp: "timesheets",
        apiUrl: ApiUrl.Timesheet, 
        identifier: "id", 
        displayProp: "id",  
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions", "users"],  
    }, 
]