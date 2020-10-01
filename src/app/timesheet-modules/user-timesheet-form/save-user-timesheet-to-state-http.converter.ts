import { Injectable } from '@angular/core';
import { Timesheet } from 'src/app/core/models';
import { SaveModelToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-to-state-http.converter';
import { SaveModelStateCommand } from 'src/app/core/services/model/interfaces';
import { ModelIdGeneratorService } from 'src/app/core/services/model/model-id-generator.service';
import { ModifyModelWithForeignsHelper } from 'src/app/core/services/model/state-helpers/modify-model-with-foreigns.helper';
import { StateCurrentUser } from 'src/app/core/services/state/interfaces';
import { _getTotalHours } from 'src/app/shared-app/helpers/datetime/get-total-hours.helper';
import { Prop } from 'src/app/shared-app/prop.type';
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
                totalHours: _getTotalHours(inputTimesheet.startTime,inputTimesheet.endTime)
            };
            
        command.entity = modifiedTimesheet;
        return super.modifyState(state, command);
    }
}