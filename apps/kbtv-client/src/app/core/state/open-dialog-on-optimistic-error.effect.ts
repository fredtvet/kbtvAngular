import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptimisticHttpErrorAction } from 'optimistic-http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';

@Injectable()
export class OpenDialogOnOptimisticError implements Effect<StateAction> {

    constructor(private dialog: MatDialog){}

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([OptimisticHttpErrorAction]),
            map(x => { 
                import('@shared/scam/optimistic-http-error-dialog/optimistic-http-error-dialog.component')
                    .then(({ OptimisticHttpErrorDialogComponent }) => {
                        this.dialog.open(
                            OptimisticHttpErrorDialogComponent, 
                            { data: x.action, panelClass: 'extended-dialog' }
                        )
                    });             
            }),
        ) 
    }

}