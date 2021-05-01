import { Mission } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { CreateMissionForm } from "@shared/constants/model-forms/save-mission-forms.const";
import { _find } from "array-helpers";
import { Converter, ModelFormResult } from "model/form";
import { SaveModelAction } from "model/state-commands";
import { _formToSaveModelConverter } from "./form-to-save-model.converter";

export const _missionFormActionConverter: Converter<ModelFormResult<CreateMissionForm, ModelState>, SaveModelAction<Mission, ModelState>> = 
    (input) => {      
        const {employerName, missionTypeName, ...rest} = input.formValue;

        let mission: Partial<Mission> = rest;

        const existingEmployer = (!employerName || !input.options?.employers) ?  null :
            _find(input.options.employers, employerName, "name");

        if(existingEmployer) mission.employerId = existingEmployer.id;
        else if(employerName) mission.employer = {name: employerName}

        const existingType = (!missionTypeName || !input.options?.missionTypes) ?  null :
            _find(input.options.missionTypes, missionTypeName, "name");

        if(existingType) mission.missionTypeId = existingType.id;
        else if(missionTypeName) mission.missionType = {name: missionTypeName}

        return _formToSaveModelConverter({...input, formValue: mission})
    }