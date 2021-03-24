import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'arrayIncludes'})
export class ArrayIncludesPipe implements PipeTransform {

  transform(arr: unknown[], item: unknown): boolean {
    if(arr === undefined || arr === null) return false;
    return arr.indexOf(item) !== -1;
  }

}
