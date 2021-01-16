import { Injectable } from "@angular/core";
import { ModelFile } from "@core/models";
import { AppNotifications } from "@shared-app/app-notifications.const";
import { ValidationRules } from "@shared/constants/validation-rules.const";
import { Immutable, Maybe } from "global-types";
import { NotificationService } from "notification";
import { ActionInterceptor, StateAction } from "state-management";
import { SaveModelFileAction } from "./save-model-file/save-model-file.action";

@Injectable()
export class ModelFileValidatorInterceptor implements ActionInterceptor {

    constructor(private notificationService: NotificationService){}

    intercept(action: Immutable<SaveModelFileAction<ModelFile>>): Maybe<StateAction> {
        if(action.type !== SaveModelFileAction) return action;
        const size = action.fileWrapper?.modifiedFile.size
        if(!size || size < ValidationRules.ContentMaxByteLength) return action;
        this.notificationService.notify(AppNotifications.maxContentLength(size))
        return null;
    }

}