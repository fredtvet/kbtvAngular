import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})

export class SortByDatePipe implements PipeTransform {

  transform(entities: any[], dateProperty: string, order: string = "asc"): any {
    if(!entities) return entities;
    return entities.sort((a: any, b: any) =>{
      if(!a[dateProperty]) return 1;
      if(!b[dateProperty]) return -1;
      let aTime = new Date(a[dateProperty]).getTime();
      let bTime = new Date(b[dateProperty]).getTime();
      if(order === "asc") return aTime - bTime;
      else return bTime - aTime;
    });
  }

}
