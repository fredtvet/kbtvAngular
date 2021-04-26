import { SaveModelFileAction } from "@actions/global-actions";
import { UpdateCurrentUserAction } from "@actions/profile-actions";
import { SaveUserTimesheetAction, UpdateTimesheetStatusesAction } from "@actions/timesheet-actions";
import { SaveUserAction } from "@actions/user-actions";
import { Model } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { translations } from "@shared-app/translations";
import { Immutable, Prop } from "global-types";
import { ModelConfig, _getModelConfig } from "model/core";
import { DeleteModelAction, ModelCommand, SaveModelAction } from 'model/state-commands';
import { ActionDescriptionMap } from "./interfaces/action-description-map.interface";

const SaveModelActionDescription = (action: SaveModelAction<Model, ModelState>) => {
    const modelConfig = _getModelConfig<ModelConfig<Model, ModelState>>(action.stateProp);
    const saveWord = action.saveAction === ModelCommand.Update ? "Oppdatering" : "Oppretting";
    const entityWord = translations[<string> modelConfig.foreignProp?.toLowerCase()]?.toLowerCase();

    const displayValue = modelConfig.displayFn?.(action.entity);
    
    if(displayValue)
        return `${saveWord} av ${entityWord} '${displayValue}'`

    const idPropValue = action.entity[<Prop<Immutable<Model>>> modelConfig.idProp];
    const idWord = translations[modelConfig.idProp.toLowerCase()] || modelConfig.idProp

    return `${saveWord} av ${entityWord} med ${idWord.toLowerCase()} '${idPropValue}'`
}

export const ActionDescriptions: ActionDescriptionMap = {

    [UpdateCurrentUserAction]: (action: UpdateCurrentUserAction) => "Oppdatering av profil",

    [UpdateTimesheetStatusesAction]: (action: UpdateTimesheetStatusesAction) => 
        `Oppdatering status for ${action.ids.length} timeregistreringer`,

    [SaveModelAction]: SaveModelActionDescription,

    [SaveModelFileAction]: SaveModelActionDescription,
    
    [SaveUserTimesheetAction]: SaveModelActionDescription,

    [SaveUserAction]: SaveModelActionDescription,

    [DeleteModelAction]: (action: DeleteModelAction<ModelState>) => {
        const modelConfig = _getModelConfig<ModelConfig<Model, ModelState>>(action.stateProp);
        const payload = action.payload;
        const multi = payload.ids && payload.ids.length > 1;
        const entityWord = translations[<string> (multi ? action.stateProp : modelConfig.foreignProp)?.toLowerCase()];           
        const idWord = translations[modelConfig.idProp.toLowerCase()] || modelConfig.idProp

        return `Sletting av ${payload.ids?.length || ''} ${entityWord?.toLowerCase() || 'ukjent'} 
                med ${idWord.toLowerCase()} ${payload.ids || payload.id}.`
    }

}
