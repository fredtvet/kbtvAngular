import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mergeObj'})
export class MergeObjPipe implements PipeTransform {

  transform(value: Object, value2: object): unknown {
    return {...value, ...value2}
  }

}