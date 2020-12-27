import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@global/interfaces';

@Pipe({name: 'objectToArray'})
export class ObjectToArrayPipe implements PipeTransform {

  transform(value: Object): Maybe<unknown[]> {
    return value ? Object.keys(value) : null;
  }

}