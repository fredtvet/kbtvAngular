import { Injectable } from "@angular/core";
import { AppNotifications } from "@shared-app/app-notifications.const";
import { _validateFileExtension } from "@shared-app/helpers/validate-file-extension.helper";
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
        if(this.hasInvalidFormat(action)) return null;
        if(this.hasMaxContentLength(action)) return null;
        return action;
    }

    private hasMaxContentLength(action: Immutable<CreateMissionImagesAction>): boolean {
        let totalSize = 0;
        const maxLength = ValidationRules.ContentMaxByteLength;
        for(const wrapper of action.fileWrappers) totalSize+=wrapper.modifiedFile.size;
        if(totalSize < maxLength) return false;
        this.notificationService.notify(AppNotifications.maxContentLength(totalSize))
        return true;
    }

    private hasInvalidFormat(action: Immutable<CreateMissionImagesAction>): boolean{
        for(var  i = 0; i < action.fileWrappers.length; i++){
            const file = action.fileWrappers[i].modifiedFile;
            if(_validateFileExtension(file, ValidationRules.MissionImageFileExtensions)) continue;
            this.notificationService.notify(AppNotifications.invalidFileFormat())
            return true
        }
        return false;
    }
//  return this.notificationService.notify(AppNotifications.error({
//               title: "Filtype ikke tillatt for en eller flere filer"
//             })); 
}