import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(value: Object): unknown[] {
    return value ? Object.keys(value) : null;
  }

}