import { SaveModelFileAction } from "@actions/global-actions"
import { ModelState } from "../../state/model-state.interface";
import { DeleteModelAction, ModelCommand, SaveModelAction } from "model/state-commands"
import { ActionRequestMap, FormDataEntry, OptimisticHttpRequest } from "optimistic-http";
import { ModelBaseUrls } from "../model/model-base-urls.const";
import { Model, ModelFile } from "../../models";
import { Immutable, Prop } from "global-types";
import { ModelIdProps } from "../model/model-id-props.const";
import { ApiUrl } from "@core/api-url.enum";

export type GenericOptimisticActionTypes = typeof SaveModelAction | typeof SaveModelFileAction | typeof DeleteModelAction;

export const GenericActionRequestMap: ActionRequestMap<GenericOptimisticActionTypes> = {
    [SaveModelAction]: (a: Immutable<SaveModelAction<Model, ModelState>>): OptimisticHttpRequest<Model> => { 
        return a.saveAction === ModelCommand.Create ? 
            { 
                method: "POST", 
                body: a.entity,
                apiUrl: ModelBaseUrls[a.stateProp]
            } : 
            { 
                method: "PUT", 
                body: a.entity, 
                apiUrl: `${ModelBaseUrls[a.stateProp]}/${a.entity[<keyof Model> ModelIdProps[a.stateProp]]}`
            }
    },
    [SaveModelFileAction]: (a: Immutable<SaveModelFileAction>) => { 
        const isCreate = a.saveAction === ModelCommand.Create;
        const file = a.fileWrapper?.modifiedFile;
        const body: FormDataEntry[] = [{name: "file", value: file}];
    
        for(const name in a.entity) 
            body.push({name, value: <string> a.entity[<Prop<ModelFile>> name]});
            
        const apiUrl = a.stateProp === "missions" ? 
            `${ApiUrl.Mission}/${a.entity.id}/UpdateHeaderImage` :
            ModelBaseUrls[a.stateProp] + (isCreate ? '' : `/${a.entity[<keyof Model> ModelIdProps[a.stateProp]]}`);
            
        return { method: isCreate ? "POST" : "PUT", apiUrl, body }
    },   
    [DeleteModelAction]: (a: Immutable<DeleteModelAction<ModelState>>) => { 
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