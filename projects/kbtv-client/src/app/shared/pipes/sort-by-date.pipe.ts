import { Pipe, PipeTransform } from '@angular/core';
import { _sortByDate } from '@array/sort-by-date.helper';
import { Immutable, ImmutableArray, Maybe } from '@global/interfaces';
import { Prop } from '@state/interfaces';

@Pipe({name: 'sortByDate'})
export class SortByDatePipe implements PipeTransform {
  transform<T>(
    entities: ImmutableArray<T>, 
    dateProperty: Prop<Immutable<T>>, 
    order: "asc" | "desc" = "desc"): Maybe<Immutable<T>[]>  {
    return entities ? _sortByDate<T>(entities, dateProperty, order) : null
  }
}
