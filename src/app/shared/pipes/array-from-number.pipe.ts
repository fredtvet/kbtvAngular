import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFromNumber'
})
export class ArrayFromNumberPipe implements PipeTransform {

  transform(value: number, includeZero: boolean = false): any {
    let arr = [];
    let i = includeZero ? 0 : 1;
    for(i; i <= value; i++){
      arr.push(i);
    }
    return arr;
  }

}
