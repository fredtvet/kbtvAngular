import { SetSaveModelFileStateAction } from "@actions/global-actions";
import { UpdateCurrentUserAction } from "@actions/profile-actions";
import { UpdateTimesheetStatusesAction } from "@actions/timesheet-actions";
import { SetSaveUserStateAction } from "@actions/user-actions";
import { Model } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { translations } from "./translations.const";
import { ActionDescriptionMap } from "../interfaces/action-description-map.interface";
import { Immutable, Prop } from "global-types";
import { _getModelConfig } from "model/core";
import { DeleteModelAction, ModelCommand, SetSaveModelStateAction } from 'model/state-commands';

const SaveModelActionDescription = (action: SetSaveModelStateAction<ModelState, Model>) => {
    const modelConfig = _getModelConfig<ModelState, Model>(action.stateProp);
    const saveWord = action.saveAction === ModelCommand.Update ? "Oppdatering" : "Oppretting";
    const entityWord = translations[<string> action.stateProp.toLowerCase()]?.toLowerCase();
    const entity = action.saveModelResult.fullModel;

    const displayValue = modelConfig.displayFn?.(entity);
    
    if(displayValue)
        return `${saveWord} av ${entityWord} '${displayValue}'`

    const idPropValue = entity[<Prop<Immutable<Model>>> modelConfig.idProp];
    const idWord = translations[modelConfig.idProp.toLowerCase()] || modelConfig.idProp

    return `${saveWord} av ${entityWord} med ${idWord.toLowerCase()} '${idPropValue}'`
}

export const ActionDescriptions: ActionDescriptionMap = {

    [UpdateCurrentUserAction]: (action: UpdateCurrentUserAction) => "Oppdatering av profil",

    [UpdateTimesheetStatusesAction]: (action: UpdateTimesheetStatusesAction) => 
        `Oppdatering status for ${action.ids.length} timeregistreringer`,

    [SetSaveModelStateAction]: SaveModelActionDescription,

    [SetSaveModelFileStateAction]: SaveModelActionDescription,

    [SetSaveUserStateAction]: SaveModelActionDescription,

    [DeleteModelAction]: (action: DeleteModelAction<ModelState, Model>) => {
        const modelConfig = _getModelConfig<ModelState, Model>(action.stateProp);
        const payload = action.payload;
        const entityWord = translations[action.stateProp.toLowerCase()];           
        const idWord = translations[modelConfig.idProp.toLowerCase()] || modelConfig.idProp

        return `Sletting av ${payload.ids?.length || ''} ${entityWord?.toLowerCase() || 'ukjent'} 
                med ${idWord.toLowerCase()} ${payload.ids || payload.id}.`
    }

}
