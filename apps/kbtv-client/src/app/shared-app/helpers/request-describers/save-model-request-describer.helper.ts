import { SaveModelRequest } from "@core/configurations/model/model-requests.interface";
import { Model } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { translations } from "../../constants/translations.const";
import { Prop, Immutable } from "global-types";
import { _getModelConfig } from "model/core";
import { AppModelStatePropTranslations } from "@shared-app/constants/model-state-prop-translations.const";

export function _saveModelRequestDescriber(request: Immutable<Omit<SaveModelRequest<Model>, "type" | "contentType">>): string {

    const modelConfig = _getModelConfig<ModelState, Model>(request.stateProp);
    const saveWord = request.method === "PUT" ? "Oppdatering" : "Oppretting";
    const entityWord = AppModelStatePropTranslations[<string> request.stateProp.toLowerCase()]?.singular.toLowerCase();

    const displayValue = modelConfig.displayFn?.(request.body);
    
    if(displayValue)
        return `${saveWord} av ${entityWord} '${displayValue}'`

    const idPropValue = request.body[<Prop<Immutable<Model>>> modelConfig.idProp];
    const idWord = translations[modelConfig.idProp.toLowerCase()] || modelConfig.idProp

    return `${saveWord} av ${entityWord} med ${idWord.toLowerCase()} '${idPropValue}'`
}
