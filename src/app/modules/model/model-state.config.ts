import { Prop } from '@shared-app/prop.type';
import { ApiUrl } from '@core/api-url.enum';
import { AppDocumentType, Employer, InboundEmailPassword, Mission, MissionDocument, MissionImage, MissionNote, MissionType, Model, Timesheet, User } from '@core/models';
import { ModelState } from './interfaces/model-state.interface';

export interface ModelConfig<TModel extends Model> { 
    stateProp: Prop<ModelState>,
    apiUrl: ApiUrl, 
    identifier: Prop<TModel>, 
    autoFetch?: boolean, 
    foreignProp?: string,
    foreignKey?: string,
    displayProp?: Prop<TModel>,
    children?: Prop<ModelState>[],
    foreigns?: Prop<ModelState>[]
}

export type ModelConfigMap = {[key: string]: ModelConfig<Model>};

export class ModelStateConfig {

    private static configMaps: {[key: string]: ModelConfigMap} = {};

    static get<TModel>(prop: Prop<ModelState>): ModelConfig<TModel>{
        return this.getBy(prop, "stateProp");
    }

    static getBy<TModel>(prop: string, key: Prop<ModelConfig<Model>>): ModelConfig<TModel>{
        if(!this.configMaps[key]) this.configMaps[key] = this.createModelStateConfigMap(key);
        return this.configMaps[key][prop];
    }

    private static createModelStateConfigMap(prop: Prop<ModelConfig<Model>>): ModelConfigMap  {
        const map: ModelConfigMap = {};
    
        for(let config of ModelStateConfigData){
            map[config[prop] as string] = config;
        }

        return map;
    }
}

const ModelStateConfigData: ModelConfig<any>[] = [
    <ModelConfig<Mission>>{
        stateProp: "missions",
        apiUrl: ApiUrl.Mission, 
        identifier: "id", 
        displayProp: "address",
        foreignProp: "mission",
        foreignKey: "missionId",
        children: ["missionImages", "missionDocuments", "missionNotes", "timesheets"], 
        foreigns: ["missionTypes","employers"],       
    },
    <ModelConfig<MissionType>>{
        stateProp: "missionTypes",
        apiUrl: ApiUrl.MissionType, 
        identifier: "id", 
        displayProp: "name",   
        foreignProp: "missionType",
        foreignKey: "missionTypeId",
    },
    <ModelConfig<Employer>>{
        stateProp: "employers",
        apiUrl: ApiUrl.Employer, 
        identifier: "id",  
        displayProp: "name",    
        foreignProp: "employer",
        foreignKey: "employerId",
    },
    <ModelConfig<AppDocumentType>>{
        stateProp: "documentTypes",
        apiUrl: ApiUrl.DocumentType, 
        identifier: "id",   
        displayProp: "name",   
        foreignProp: "documentType",
        foreignKey: "documentTypeId",
    }, 
    <ModelConfig<MissionImage>>{
        stateProp: "missionImages",
        apiUrl: ApiUrl.MissionImage, 
        identifier: "id",  
        displayProp: "fileName",    
        foreignProp: "missionImage",
        foreignKey: "missionImageId",
    },    
    <ModelConfig<MissionDocument>>{
        stateProp: "missionDocuments",
        apiUrl: ApiUrl.MissionDocument, 
        identifier: "id", 
        displayProp: "fileName",   
        foreignProp: "missionDocument",
        foreignKey: "missionDocumentId",
        foreigns: ["documentTypes"]
    },    
    <ModelConfig<MissionNote>>{
        stateProp: "missionNotes",
        apiUrl: ApiUrl.MissionNote, 
        identifier: "id",    
        displayProp: "id",  
        foreignProp: "missionNote",
        foreignKey: "missionNoteId",
    },
    <ModelConfig<User>>{
        stateProp: "users",
        apiUrl: ApiUrl.Users, 
        identifier: "userName", 
        displayProp: "userName",  
        autoFetch: true,
        foreignProp: "user",
        foreignKey: "userName",     
        foreigns: ["employers"]
    },      
    <ModelConfig<InboundEmailPassword>>{
        stateProp: "inboundEmailPasswords",
        apiUrl: ApiUrl.InboundEmailPassword, 
        identifier: "id", 
        displayProp: "password",      
        foreignProp: "inboundEmailPassword",   
        foreignKey: "inboundEmailPasswordId",      
        autoFetch: true,    
    }, 
    <ModelConfig<Timesheet>>{
        stateProp: "userTimesheets",
        apiUrl: ApiUrl.UserTimesheet, 
        identifier: "id",
        displayProp: "id",  
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions"],  
    },    
    <ModelConfig<Timesheet>>{
        stateProp: "timesheets",
        apiUrl: ApiUrl.Timesheet, 
        identifier: "id", 
        displayProp: "id",  
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions", "users"],  
    }, 
]
