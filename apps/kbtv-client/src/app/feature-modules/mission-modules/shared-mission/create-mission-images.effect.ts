import { SaveModelFileAction } from "@actions/global-actions";
import { CreateMissionImagesAction } from "@actions/mission-actions";
import { Injectable } from "@angular/core";
import { MissionImage } from "@core/models";
import { AppNotifications } from "@shared-app/app-notifications.const";
import { _validateFileExtension } from "@shared-app/helpers/validate-file-extension.helper";
import { ModelFileForm, _formToSaveModelFileConverter } from "@shared/action-converters/form-to-save-model-file.converter";
import { ValidationRules } from "@shared/constants/validation-rules.const";
import { NotificationService } from "notification";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { DispatchedAction, Effect, listenTo } from "state-management";
import { ModelCommand } from 'model/state-commands';
import { Immutable } from "global-types";

@Injectable()
export class CreateMissionImagesEffect implements Effect<CreateMissionImagesAction> {

    constructor(private notificationService: NotificationService){}

    handle$(actions$: Observable<DispatchedAction<CreateMissionImagesAction, {}>>) {
        return actions$.pipe(
            listenTo([CreateMissionImagesAction]),
            mergeMap(x => { 
                const actions: Immutable<SaveModelFileAction>[] = [];
   
                for(const key in x.action.files){
                    const file = x.action.files[key];

                    if(!_validateFileExtension(file, ValidationRules.MissionImageFileExtensions)){
                        this.notificationService.notify(AppNotifications.invalidFileFormat())
                        continue;
                    }

                    actions.push(_formToSaveModelFileConverter({
                        stateProp: "missionImages", 
                        formValue: <ModelFileForm> { missionId: x.action.missionId, file}, 
                        saveAction: ModelCommand.Create
                    }))
                }

                return of(...actions);
            })
        )
    }
    
}