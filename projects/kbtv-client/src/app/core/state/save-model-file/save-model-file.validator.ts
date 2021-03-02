import { Injectable } from "@angular/core";
import { SaveModelFileAction } from "@core/state/save-model-file/save-model-file.action";
import { AppNotifications } from "@shared-app/app-notifications.const";
import { _validateFileExtension } from "@shared-app/helpers/validate-file-extension.helper";
import { ValidationRules } from "@shared/constants/validation-rules.const";
import { Immutable, Maybe } from "global-types";
import { NotificationService } from "notification";
import { ActionInterceptor, StateAction } from "state-management";

@Injectable()
export class SaveModelFileValidatorInterceptor implements ActionInterceptor {

    constructor(private notificationService: NotificationService){}

    intercept(action: Immutable<SaveModelFileAction>): Maybe<StateAction> {
        if(action.type !== SaveModelFileAction) return action;
        if(this.hasMaxContentLength(action)) return null;
        return action;
    }

    private hasMaxContentLength(action: Immutable<SaveModelFileAction>): boolean {
        const size = action.fileWrapper?.modifiedFile.size;
        if(!size || size < ValidationRules.ContentMaxByteLength) return false;
        this.notificationService.notify(AppNotifications.maxContentLength(size))
        return true;
    }
}