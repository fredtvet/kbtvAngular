import { Compiler, Injectable, Injector } from '@angular/core';
import { _tryWithLogging } from 'array-helpers';
import { ConfirmDialogService } from 'confirm-dialog';
import { from, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'any' })
export class AppConfirmDialogService {
  
  dialog$: Observable<ConfirmDialogService> =
    from(import('confirm-dialog').then(({ConfirmDialogModule, ConfirmDialogService}) => {
      const moduleFactory = this.compiler.compileModuleSync(ConfirmDialogModule);   
      const moduleInstance = moduleFactory.create(this.injector);
      return moduleInstance.injector.get(ConfirmDialogService);
    })).pipe(shareReplay())

  constructor(
    private compiler: Compiler,
    private injector: Injector
  ) { }

}

