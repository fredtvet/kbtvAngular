import { Injectable } from '@angular/core';
import { AppDialogService } from '@core/services/app-dialog.service';
import { Immutable } from 'global-types';
import { OptimisticHttpErrorAction } from 'optimistic-http';
import { forkJoin, from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';

@Injectable()
export class OpenDialogOnOptimisticError implements Effect<OptimisticHttpErrorAction> {

    constructor(private dialogService: AppDialogService){}

    handle$(actions$: Observable<DispatchedAction<OptimisticHttpErrorAction>>): Observable<void> {
        return actions$.pipe(
            listenTo([OptimisticHttpErrorAction]),
            mergeMap(x => this.openDialog$(x.action)),
        ) 
    }

    private openDialog$(data: Immutable<OptimisticHttpErrorAction>): Observable<void> {
        return forkJoin([
            from(import('@shared/scam/optimistic-http-error-dialog/optimistic-http-error-dialog.component')),
            this.dialogService.dialog$                 
        ]).pipe(
            map(([{OptimisticHttpErrorDialogComponent}, dialog]) => {
                dialog.open(
                    OptimisticHttpErrorDialogComponent, 
                    { data, panelClass: 'extended-dialog' }
                )
            })
        )
    }

}