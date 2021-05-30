import { SetSaveModelFileStateAction } from "@actions/global-actions";
import { ApiUrl } from "../../api-url.enum";
import { Prop } from "global-types";
import { DeleteModelAction, ModelCommand, SetSaveModelStateAction } from "model/state-commands";
import { ActionRequestMap, FormDataEntry } from "optimistic-http";
import { Model } from "../../models";
import { ModelState } from "../../state/model-state.interface";
import { ModelBaseUrls } from "../model/model-base-urls.const";
import { ModelIdProps } from "../model/model-id-props.const";

export type GenericOptimisticActions = SetSaveModelStateAction<ModelState, Model> | SetSaveModelFileStateAction | DeleteModelAction<ModelState, Model>;

export const GenericActionRequestMap: ActionRequestMap<GenericOptimisticActions> = {
    [SetSaveModelStateAction]: (a) => { 
        return a.saveAction === ModelCommand.Create ? 
            { 
                method: "POST", 
                body: a.saveModelResult.fullModel,
                apiUrl: ModelBaseUrls[a.stateProp]
            } : 
            { 
                method: "PUT", 
                body: a.saveModelResult.fullModel, 
                apiUrl: `${ModelBaseUrls[a.stateProp]}/${a.saveModelResult.fullModel[<keyof Model> ModelIdProps[a.stateProp]]}`
            }
    },
    [SetSaveModelFileStateAction]: (a) => { 
        const isCreate = a.saveAction === ModelCommand.Create;
        
        const body: FormDataEntry[] = [{name: "file", value: a.file}];
    
        const {fileName, ...entity} = a.saveModelResult.fullModel;

        for(const name in entity) {
            const value = entity[<Prop<typeof entity>> name]
            if(value !== null && typeof value === "object") continue; //Ignore nestd properties
            body.push({name, value: <string> entity[<Prop<typeof entity>> name]});
        }
            
        const apiUrl = a.stateProp === "missions" ? 
            `${ApiUrl.Mission}/${entity.id}/UpdateHeaderImage` :
            ModelBaseUrls[a.stateProp] + (isCreate ? '' : `/${entity[<keyof Model> ModelIdProps[a.stateProp]]}`);
            
        return { method: isCreate ? "POST" : "PUT", apiUrl, body }
    },   
    [DeleteModelAction]: (a) => { 
        return a.payload.id ? 
            { 
                method: "DELETE", 
                apiUrl: `${ModelBaseUrls[a.stateProp]}/${a.payload.id}`,
            } :
            { 
                method: "POST", 
                apiUrl: `${ModelBaseUrls[a.stateProp]}/DeleteRange`, 
                body: {ids: a.payload.ids},
            }  
    }
}