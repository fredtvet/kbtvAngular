import { Injectable } from "@angular/core";
import { AppNotifications } from "@shared-app/app-notifications.const";
import { ValidationRules } from "@shared/constants/validation-rules.const";
import { Immutable, Maybe } from "global-types";
import { NotificationService } from "notification";
import { ActionInterceptor, StateAction } from "state-management";
import { CreateMissionImagesAction } from "./create-mission-images.action";

@Injectable()
export class CreateMissionImagesValidatorInterceptor implements ActionInterceptor {

    constructor(private notificationService: NotificationService){}

    intercept(action: Immutable<CreateMissionImagesAction>): Maybe<StateAction> {
        if(action.type !== CreateMissionImagesAction) return action;
        let totalSize = 0;
        const maxLength = ValidationRules.ContentMaxByteLength;
        for(const wrapper of action.fileWrappers) totalSize+=wrapper.modifiedFile.size;
        if(totalSize < maxLength) return action;
        this.notificationService.notify(AppNotifications.maxContentLength(totalSize))
        return null;
    }

}