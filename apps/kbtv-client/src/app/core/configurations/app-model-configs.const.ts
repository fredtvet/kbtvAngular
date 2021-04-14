import { ApiUrl } from '../api-url.enum';
import { Mission, MissionType, Employer, MissionImage, MissionDocument, MissionNote, User, InboundEmailPassword, Timesheet } from '../models';
import { ModelState } from '../state/model-state.interface';
import { ModelConfig } from 'model-state';
import { ModelIdProps } from './model-id-props.const';

export const AppModelConfigs: unknown[] = [
    <ModelConfig<Mission, ModelState>>{
        stateProp: "missions",
        apiUrl: ApiUrl.Mission, 
        idProp: ModelIdProps.missions, 
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
        idProp: ModelIdProps.missionTypes, 
        displayProp: "name",   
        foreignProp: "missionType",
        foreignKey: "missionTypeId",
    },
    <ModelConfig<Employer, ModelState>>{
        stateProp: "employers",
        apiUrl: ApiUrl.Employer, 
        idProp: ModelIdProps.employers,  
        displayProp: "name",    
        foreignProp: "employer",
        foreignKey: "employerId",
    }, 
    <ModelConfig<MissionImage, ModelState>>{
        stateProp: "missionImages",
        apiUrl: ApiUrl.MissionImage, 
        idProp: ModelIdProps.missionImages,  
        displayProp: "fileName",    
        foreignProp: "missionImage",
        foreignKey: "missionImageId",
    },    
    <ModelConfig<MissionDocument, ModelState>>{
        stateProp: "missionDocuments",
        apiUrl: ApiUrl.MissionDocument, 
        idProp: ModelIdProps.missionDocuments, 
        displayProp: "name",   
        foreignProp: "missionDocument",
        foreignKey: "missionDocumentId",
    },    
    <ModelConfig<MissionNote, ModelState>>{
        stateProp: "missionNotes",
        apiUrl: ApiUrl.MissionNote, 
        idProp: ModelIdProps.missionNotes,    
        displayProp: "id",  
        foreignProp: "missionNote",
        foreignKey: "missionNoteId",
    },
    <ModelConfig<User, ModelState>>{
        stateProp: "users",
        apiUrl: ApiUrl.Users, 
        idProp: ModelIdProps.users, 
        displayProp: "userName",  
        fetchable: true,
        foreignProp: "user",
        foreignKey: "userName",     
        foreigns: ["employers"]
    },      
    <ModelConfig<InboundEmailPassword, ModelState>>{
        stateProp: "inboundEmailPasswords",
        apiUrl: ApiUrl.InboundEmailPassword, 
        idProp: ModelIdProps.inboundEmailPasswords, 
        displayProp: "password",      
        foreignProp: "inboundEmailPassword",   
        foreignKey: "inboundEmailPasswordId",      
        fetchable: true,    
    }, 
    <ModelConfig<Timesheet, ModelState>>{
        stateProp: "userTimesheets",
        apiUrl: ApiUrl.UserTimesheet, 
        idProp: ModelIdProps.timesheets,
        displayProp: "id",  
        foreignProp: "userTimesheet",
        foreignKey: "userTimesheetId",
        foreigns: ["missions"],  
    },    
    <ModelConfig<Timesheet, ModelState>>{
        stateProp: "timesheets",
        apiUrl: ApiUrl.Timesheet, 
        idProp: ModelIdProps.userTimesheets, 
        displayProp: "id",  
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions", "users"],  
    }, 
]