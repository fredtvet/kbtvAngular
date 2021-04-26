import { ModelState } from '@core/state/model-state.interface';
import { ModelFetcherConfig } from 'model/state-fetcher';
import { ApiUrl } from '../../api-url.enum';
import { Employer, InboundEmailPassword, Mission, MissionDocument, MissionImage, MissionNote, MissionType, Timesheet, User } from '../../models';
import { ModelIdProps } from './model-id-props.const';

export interface AppModelConfig<TModel> extends ModelFetcherConfig<TModel, ModelState> {}

export const AppModelConfigs = [
    <AppModelConfig<Mission>>{
        stateProp: "missions",
        idProp: ModelIdProps.missions, 
        displayFn: (m: Mission) => m.address,
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
        modelApiUrl: ApiUrl.Mission,      
    },
    <AppModelConfig<MissionType>>{
        stateProp: "missionTypes", 
        idProp: ModelIdProps.missionTypes,
        displayFn: (m: MissionType) => m.name,
        foreignProp: "missionType",
        foreignKey: "missionTypeId",
        modelApiUrl: ApiUrl.MissionType,
    },
    <AppModelConfig<Employer>>{
        stateProp: "employers",
        idProp: ModelIdProps.employers,  
        displayFn: (m: Employer) => m.name,    
        foreignProp: "employer",
        foreignKey: "employerId",
        modelApiUrl: ApiUrl.Employer, 
    }, 
    <AppModelConfig<MissionImage>>{
        stateProp: "missionImages",
        idProp: ModelIdProps.missionImages,  
        displayFn: (m: MissionImage) => m.fileName,
        foreignProp: "missionImage",
        foreignKey: "missionImageId",
        modelApiUrl: ApiUrl.MissionImage, 
    },    
    <AppModelConfig<MissionDocument>>{
        stateProp: "missionDocuments",
        idProp: ModelIdProps.missionDocuments, 
        displayFn: (m: MissionDocument) => m.name,
        foreignProp: "missionDocument",
        foreignKey: "missionDocumentId",
        modelApiUrl: ApiUrl.MissionDocument, 
    },    
    <AppModelConfig<MissionNote>>{
        stateProp: "missionNotes",
        idProp: ModelIdProps.missionNotes,
        displayFn: (m: MissionNote) => `(${m.id}) ${m.title || 'Uten tittel'}`, 
        foreignProp: "missionNote",
        foreignKey: "missionNoteId",   
        modelApiUrl: ApiUrl.MissionNote,
    },
    <AppModelConfig<User>>{
        stateProp: "users",
        idProp: ModelIdProps.users, 
        displayFn: (m: User) => m.userName,
        foreignProp: "user",
        foreignKey: "userName",     
        foreigns: ["employers"],      
        modelApiUrl: ApiUrl.Users, 
        fetchUrl: ApiUrl.Users,
    },      
    <AppModelConfig<InboundEmailPassword>>{
        stateProp: "inboundEmailPasswords",
        modelApiUrl: ApiUrl.InboundEmailPassword, 
        idProp: ModelIdProps.inboundEmailPasswords, 
        displayFn: (m: InboundEmailPassword) => m.password,  
        foreignProp: "inboundEmailPassword",   
        foreignKey: "inboundEmailPasswordId",      
        fetchUrl: ApiUrl.InboundEmailPassword,    
    }, 
    <AppModelConfig<Timesheet>>{
        stateProp: "userTimesheets",
        idProp: ModelIdProps.timesheets,
        displayFn: (m: Timesheet) => m.id,
        foreignProp: "userTimesheet",
        foreignKey: "userTimesheetId",
        foreigns: ["missions"],          
        modelApiUrl: ApiUrl.UserTimesheet, 
    },    
    <AppModelConfig<Timesheet>>{
        stateProp: "timesheets",
        idProp: ModelIdProps.userTimesheets, 
        displayFn: (m: Timesheet) => m.id,
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions", "users"],     
        modelApiUrl: ApiUrl.Timesheet,  
    }, 
]