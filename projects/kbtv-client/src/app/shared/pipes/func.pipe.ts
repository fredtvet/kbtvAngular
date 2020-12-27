import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'func'})
export class FuncPipe implements PipeTransform { 
    transform(fn: unknown, ...args: unknown[]): unknown {
        return (fn instanceof Function) ? fn.apply(null, args) : null
    }
}
