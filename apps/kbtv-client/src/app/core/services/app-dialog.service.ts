import { Compiler, Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'any' })
export class AppDialogService {
  
    dialog$: Observable<MatDialog> =
        from(import('@angular/material/dialog').then(({MatDialogModule, MatDialog}) => {
            const moduleFactory = this.compiler.compileModuleSync(MatDialogModule);  
            const moduleInstance = moduleFactory.create(this.injector);
            return moduleInstance.injector.get(MatDialog) 
        })).pipe(shareReplay())

    constructor(
        private compiler: Compiler,
        private injector: Injector
    ) { }

}

