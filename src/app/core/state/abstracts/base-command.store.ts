import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ApiService, ArrayHelperService } from 'src/app/core/services';
import { StateHttpCommand } from '../state-http-converter';
import { BaseStore } from './base.store';

export abstract class BaseCommandStore<TState> extends BaseStore<TState>  {

    constructor(
        protected arrayHelperService: ArrayHelperService,
        protected apiService: ApiService) {  
        super(arrayHelperService, apiService);
    }

    protected _stateHttpCommandHandler(command: StateHttpCommand<TState>): void {   
        if(!command) console.trace("No state http command provided");

        let state: TState;
        if(command.stateFunc){
            state =  this.getState(false);
            this._setStateVoid(command.stateFunc)
        }

        this.getHttpCommandObserver(command).pipe(
            catchError(err => {
                command.stateFunc ? this._setStateVoid(state) : null; 
                return throwError(err)
            }),
            finalize(() => console.log("httpObserver finalized"))
        ).subscribe(); 
    }

    private getHttpCommandObserver(command: {httpMethod: "POST" | "PUT" | "DELETE", apiUrl: string, httpBody: any}){
        switch(command.httpMethod){
            case "POST": return this.apiService.post(command.apiUrl, command.httpBody);
            case "PUT": return this.apiService.put(command.apiUrl, command.httpBody);
            case "DELETE": return this.apiService.delete(command.apiUrl);
        }
    }
}
