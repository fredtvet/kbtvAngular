import { Pipe, PipeTransform } from '@angular/core';
import { ImmutableArray } from '@immutable/interfaces';

@Pipe({
  name: 'reverseArray'
})
export class ReverseArrayPipe implements PipeTransform {

  transform(arr: ImmutableArray<unknown>) {
    return arr?.slice().reverse();
  }

}
