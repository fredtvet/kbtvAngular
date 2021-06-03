import { DeleteModelRangeRequest } from "@core/configurations/model/model-requests.interface";
import { Model } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { Immutable } from "global-types";
import { _getModelConfig } from "model/core";
import { translations } from "../../constants/translations.const";

export function _deleteModelRangeRequestDescriber(request: Immutable<DeleteModelRangeRequest<Model>>): string {
    const modelConfig = _getModelConfig<ModelState, Model>(request.stateProp);
    const payload = request.body;
    const entityWord = translations[request.stateProp.toLowerCase()];           
    const idWord = translations[modelConfig.idProp.toLowerCase()] || modelConfig.idProp

    return `Sletting av ${payload.ids?.length || ''} ${entityWord?.toLowerCase() || 'ukjent'} 
            med ${idWord.toLowerCase()} ${payload.ids}.`
}