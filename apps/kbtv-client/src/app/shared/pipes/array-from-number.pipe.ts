import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'arrayFromNumber'})
export class ArrayFromNumberPipe implements PipeTransform {
  transform(value: number, includeZero: boolean = false): number[] {
    let arr = [];
    for(let i = includeZero ? 0 : 1; i <= value; i++) arr.push(i);
    return arr;
  }
}
