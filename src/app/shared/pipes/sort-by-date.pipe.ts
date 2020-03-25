import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})

export class SortByDatePipe implements PipeTransform {

  transform(entities: any[], dateProperty: string): any {
      const t = entities;
      return t.sort((a: any, b: any) =>
          new Date(a[dateProperty]).getTime() - new Date(b[dateProperty]).getTime()
      );
  }

}
