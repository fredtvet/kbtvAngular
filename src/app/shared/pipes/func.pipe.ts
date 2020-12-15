import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'func'})
export class FuncPipe implements PipeTransform { 
    transform(fn: unknown, ...args: unknown[]): unknown {
        if(fn instanceof Function) return(fn.apply(null, args));
    }
}
