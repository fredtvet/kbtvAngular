import { SaveModelFileAction, SetSaveModelFileStateAction } from "@core/global-actions";
import { ModelFile } from "../../models";
import { Immutable } from "global-types";
import { _getModelConfig, _saveModel } from "model/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DispatchedAction, Effect, listenTo, StateAction } from "state-management";
import { ModelState } from "../model-state.interface";

export class SaveModelFileEffect implements Effect<SaveModelFileAction> {

    handle$(actions$: Observable<DispatchedAction<SaveModelFileAction, ModelState>>): Observable<void | Immutable<StateAction<string>>> {
        return actions$.pipe(
            listenTo([SaveModelFileAction]),
            map(({stateSnapshot, action}): Immutable<SetSaveModelFileStateAction> => {

                const modelCfg = _getModelConfig<ModelState, ModelFile>(action.stateProp);
                const preGenIds: Record<string, boolean> = {}

                let entity = <ModelFile> {...action.entity};

                if(!action.entity[modelCfg.idProp]){
                    const newId = modelCfg.idGenerator!();
                    entity[modelCfg.idProp] = <undefined> newId;
                    preGenIds[<string> newId] = true;
                }

                entity.fileName = URL.createObjectURL(action.file);

                const saveModelResult = _saveModel<ModelState, ModelFile>(
                    stateSnapshot, 
                    action.stateProp, 
                    entity, 
                    {[action.stateProp]: preGenIds}
                );

                return {
                    type: SetSaveModelFileStateAction, saveModelResult, 
                    stateProp: action.stateProp,
                    saveAction: action.saveAction,
                    file: action.file
                }
            })
        )
    }
   
}