import { Injectable } from '@angular/core';
import { ModelConfig } from 'src/app/core/services/model/model-state.config';
import { ModifyModelWithForeignsHelper } from 'src/app/core/services/model/state-helpers/modify-model-with-foreigns.helper';
import { SaveModelReducer } from 'src/app/core/services/model/state/save-model/save-model.reducer';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { _getTotalHours } from 'src/app/shared-app/helpers/datetime/get-total-hours.helper';
import { TimesheetStatus } from 'src/app/shared/enums';
import { SaveUserTimesheetAction, SaveUserTimesheetStateCommand } from './save-user-timesheet-state-command.interface';

@Injectable({providedIn: 'root'})
export class SaveUserTimesheetReducer extends SaveModelReducer {

    constructor(
        commandDispatcher: CommandDispatcher,
        modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
    ){  
        super(commandDispatcher, modifyModelWithForeignsHelper)
    }

    protected initCommandListener(){
        this.commandDispatcher.listen$<SaveUserTimesheetStateCommand>(SaveUserTimesheetAction)
            .subscribe(res => this.handle(res.command))
    }
    
    protected modifyState(state: any, command: SaveUserTimesheetStateCommand, modelConfig: ModelConfig): Partial<any>{ 
        let inputTimesheet = command.entity;
        let modifiedTimesheet = {};

        if(inputTimesheet)
            modifiedTimesheet = {...inputTimesheet,
                status: TimesheetStatus.Open,
                userName: state?.currentUser?.userName,
                totalHours: _getTotalHours(inputTimesheet.startTime,inputTimesheet.endTime)
            };
            
        command.entity = modifiedTimesheet;
        return super.modifyState(state, command, modelConfig);
    }

    protected getCommandStateProperties(command: SaveUserTimesheetStateCommand, modelConfig: ModelConfig): string[]{
        return ["currentUser", ...super.getCommandStateProperties(command, modelConfig)]
    }
}