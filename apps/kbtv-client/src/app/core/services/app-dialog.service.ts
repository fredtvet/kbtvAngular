import { Compiler, Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'any' })
export class AppDialogService {
  
    dialog$: Observable<MatDialog> =
        of(null).pipe(
            switchMap(x => from(import('@angular/material/dialog'))),
            map(({MatDialogModule, MatDialog}) => {
            const moduleFactory = this.compiler.compileModuleSync(MatDialogModule);   
            const moduleInstance = moduleFactory.create(this.injector);
            return moduleInstance.injector.get(MatDialog);
            }),
            shareReplay()
        )

    constructor(
        private compiler: Compiler,
        private injector: Injector
    ) { }

}

