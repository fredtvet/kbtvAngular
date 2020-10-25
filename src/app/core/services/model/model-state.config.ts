import { Prop } from 'src/app/shared-app/prop.type';
import { ApiUrl } from '../../api-url.enum';
import { ModelState } from './interfaces/model-state.interface';


export interface ModelConfig { 
    stateProp: Prop<ModelState>,
    apiUrl: ApiUrl, 
    identifier: string, 
    notPersisted?: boolean, 
    foreignProp?: string,
    foreignKey?: string,
    displayProp?: string,
    children?: Prop<ModelState>[],
    foreigns?: Prop<ModelState>[]
}

export type ModelConfigMap = {[key: string]: ModelConfig};

export class ModelStateConfig {

    private static configMaps: {[key: string]: ModelConfigMap} = {};

    static get(prop: Prop<ModelState>): ModelConfig{
        return this.getBy(prop, "stateProp");
    }

    static getBy(prop: string, key: Prop<ModelConfig>): ModelConfig{
        if(!this.configMaps[key]) this.configMaps[key] = this.createModelStateConfigMap(key);
        return this.configMaps[key][prop];
    }

    private static createModelStateConfigMap(prop: Prop<ModelConfig>): ModelConfigMap  {
        const map: ModelConfigMap = {};
    
        for(let config of ModelStateConfigData){
            map[config[prop] as string] = config;
        }

        return map;
    }
}

const ModelStateConfigData: ModelConfig[] = [
    {
        stateProp: "missions",
        apiUrl: ApiUrl.Mission, 
        identifier: "id", 
        displayProp: "address",
        foreignProp: "mission",
        foreignKey: "missionId",
        children: ["missionImages", "missionDocuments", "missionNotes", "timesheets"], 
        foreigns: ["missionTypes","employers"],       
    },
    {
        stateProp: "missionTypes",
        apiUrl: ApiUrl.MissionType, 
        identifier: "id", 
        displayProp: "name",   
        foreignProp: "missionType",
        foreignKey: "missionTypeId",
    },
    {
        stateProp: "employers",
        apiUrl: ApiUrl.Employer, 
        identifier: "id",  
        displayProp: "name",    
        foreignProp: "employer",
        foreignKey: "employerId",
    },
    {
        stateProp: "documentTypes",
        apiUrl: ApiUrl.DocumentType, 
        identifier: "id",   
        displayProp: "name",   
        foreignProp: "documentType",
        foreignKey: "documentTypeId",
    }, 
    {
        stateProp: "missionImages",
        apiUrl: ApiUrl.MissionImage, 
        identifier: "id",  
        displayProp: "fileName",    
        foreignProp: "missionImage",
        foreignKey: "missionImageId",
    },    
    {
        stateProp: "missionDocuments",
        apiUrl: ApiUrl.MissionDocument, 
        identifier: "id", 
        displayProp: "fileName",   
        foreignProp: "missionDocument",
        foreignKey: "missionDocumentId",
        foreigns: ["documentTypes"]
    },    
    {
        stateProp: "missionNotes",
        apiUrl: ApiUrl.MissionNote, 
        identifier: "id",    
        displayProp: "id",  
        foreignProp: "missionNote",
        foreignKey: "missionNoteId",
    },
    {
        stateProp: "users",
        apiUrl: ApiUrl.Users, 
        identifier: "userName", 
        displayProp: "userName",  
        notPersisted: true,
        foreignProp: "user",
        foreignKey: "userName",     
        foreigns: ["employers"]
    },      
    {
        stateProp: "inboundEmailPasswords",
        apiUrl: ApiUrl.InboundEmailPassword, 
        identifier: "id", 
        displayProp: "password",      
        foreignProp: "inboundEmailPassword",   
        foreignKey: "inboundEmailPasswordId",      
        notPersisted: true,    
    }, 
    {
        stateProp: "userTimesheets",
        apiUrl: ApiUrl.UserTimesheet, 
        identifier: "id",
        displayProp: "id",  
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions", "users"],  
    },    
    {
        stateProp: "timesheets",
        apiUrl: ApiUrl.Timesheet, 
        identifier: "id", 
        displayProp: "id",  
        notPersisted: true,
        foreignProp: "timesheet",
        foreignKey: "timesheetId",
        foreigns: ["missions", "users"],  
    }, 
]
