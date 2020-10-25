import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'func'})
export class FuncPipe implements PipeTransform { 
    transform(fn: any, ...args: any[]): any {
        if(fn instanceof Function) return(fn.apply(null, args));
    }
}
