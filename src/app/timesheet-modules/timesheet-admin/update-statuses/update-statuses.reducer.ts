import { Injectable } from '@angular/core';
import { ObservableStore } from 'src/app/core/services/state/abstracts/observable-store';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { _addOrUpdateRange } from 'src/app/shared-app/helpers/array/add-or-update-range.helper';
import { UpdateStatusesAction, UpdateStatusesStateCommand } from './update-statuses-state-command.interface';

@Injectable({providedIn: 'root'})
export class UpdateStatusesReducer extends ObservableStore<any>{

    constructor(private commandDispatcher: CommandDispatcher){ 
        super();
        this.initCommandListener();
    }

    private initCommandListener(): void{
        this.commandDispatcher.listen$<UpdateStatusesStateCommand>(UpdateStatusesAction)
            .subscribe(res => this.handle(res.command))
    }

    private handle(command: UpdateStatusesStateCommand): void{
        this.setStateWithStateFunc(["timesheets"], (state: any)  => this.modifyState(state, command));
    }

    private modifyState(state: any, command: UpdateStatusesStateCommand): Partial<any>{  
        const updatedTimesheets = command.ids.map(id => { return {id, status: command.status} });
        return { timesheets: _addOrUpdateRange(state.timesheets, updatedTimesheets, "id") }
    }
}
