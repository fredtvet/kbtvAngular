import { Injectable } from '@angular/core';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { ModifyModelWithForeignsHelper } from 'src/app/core/model/state-helpers/modify-model-with-foreigns.helper';
import { Prop } from 'src/app/core/model/state.types';
import { Timesheet } from 'src/app/core/models';
import { ModelIdGeneratorService } from 'src/app/core/services/model';
import { SaveModelToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-to-state-http.converter';
import { StateCurrentUser } from 'src/app/core/state';
import { TimesheetStatus } from 'src/app/shared/enums';

@Injectable({providedIn: 'any'})
export class SaveUserTimesheetToStateHttpConverter<TState extends StateCurrentUser>
    extends SaveModelToStateHttpConverter<TState, SaveModelStateCommand<Timesheet>> {

    constructor(
        modelIdGenerator: ModelIdGeneratorService,
        modifyModelWithForeignsHelper: ModifyModelWithForeignsHelper
    ){ super(modelIdGenerator, modifyModelWithForeignsHelper); }


    protected createProperties(command: SaveModelStateCommand<Timesheet>): Prop<TState>[]{
        return ["currentUser" as any, ...super.createProperties(command)]
     }

    protected modifyState(state: TState, command: SaveModelStateCommand<Timesheet>): Partial<TState>{
        let inputTimesheet = command.entity;
        let modifiedTimesheet = {};
        if(inputTimesheet)
            modifiedTimesheet = {...inputTimesheet,
                status: TimesheetStatus.Open,
                userName: state?.currentUser?.userName,
                totalHours: 
                Math.round(
                    (Math.abs(
                        inputTimesheet.startTime - 
                        inputTimesheet.endTime
                    ) / 36e5)* 10) / 10
            };
            
        command.entity = modifiedTimesheet;
        return super.modifyState(state, command);
    }
}