import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayIncludes'
})
export class ArrayIncludesPipe implements PipeTransform {

  transform(arr: any[], item: any): any {
    if(arr === undefined || arr === null) return false;
    return arr.includes(item);
  }

}
