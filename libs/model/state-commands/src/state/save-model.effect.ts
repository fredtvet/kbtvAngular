import { ImmutableObject } from "global-types";
import { _saveModel } from "model/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DispatchedAction, Effect, listenTo, StateAction } from "state-management";
import { SaveModelAction, SetSaveModelStateAction } from "../actions";

export class SaveModelEffect implements Effect<SaveModelAction<any,any>> {

    handle$(actions$: Observable<DispatchedAction<SaveModelAction<any, any>, {}>>): Observable<void | ImmutableObject<StateAction<string>>> {
        return actions$.pipe(
            listenTo([SaveModelAction]),
            map(({stateSnapshot, action}) => {
                const saveModelResult = _saveModel<any,any>(stateSnapshot, action.stateProp, action.entity);
                return <SetSaveModelStateAction<any,any>>{
                    type: SetSaveModelStateAction,
                    saveModelResult,
                    stateProp: action.stateProp,
                    saveAction: action.saveAction
                }
            })
        )
    }
   
}