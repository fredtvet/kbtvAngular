import { SaveModelFileAction, SetSaveModelFileStateAction } from "@actions/global-actions";
import { ApiUrl } from "@core/api-url.enum";
import { Immutable, Prop } from "global-types";
import { DeleteModelAction, ModelCommand, SaveModelAction, SetSaveModelStateAction } from "model/state-commands";
import { ActionRequestMap, FormDataEntry, OptimisticHttpRequest } from "optimistic-http";
import { Model } from "../../models";
import { ModelState } from "../../state/model-state.interface";
import { ModelBaseUrls } from "../model/model-base-urls.const";
import { ModelIdProps } from "../model/model-id-props.const";

export type GenericOptimisticActionTypes = typeof SaveModelAction | typeof SaveModelFileAction | typeof DeleteModelAction;

export const GenericActionRequestMap: ActionRequestMap<GenericOptimisticActionTypes> = {
    [SetSaveModelStateAction]: (a: Immutable<SetSaveModelStateAction<ModelState, Model>>): OptimisticHttpRequest<Model> => { 
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
    [SetSaveModelFileStateAction]: (a: Immutable<SetSaveModelFileStateAction>) => { 
        const isCreate = a.saveAction === ModelCommand.Create;
        const file = a.fileWrapper?.modifiedFile;
        const body: FormDataEntry[] = [{name: "file", value: file}];
    
        const {localFileUrl, ...entity} = a.saveModelResult.fullModel;

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
    [DeleteModelAction]: (a: Immutable<DeleteModelAction<ModelState, Model>>) => { 
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