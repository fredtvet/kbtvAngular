import { Pipe, PipeTransform } from '@angular/core';
import { _sortByDate } from 'src/app/shared-app/helpers/array/sort-by-date.helper';

@Pipe({
  name: 'sortByDate'
})

export class SortByDatePipe implements PipeTransform {

  transform(entities: any[], dateProperty: string, order: "asc" | "desc" = "asc"): any {
    if(!entities) return entities;
    return _sortByDate(entities, dateProperty, order)
  }

}
