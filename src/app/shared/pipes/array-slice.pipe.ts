import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@global/interfaces';

@Pipe({name: 'arrayslice'})

//Slices items up and grabs n'th index based on rowNr from each slice. 
//Used to keep items in order when displaying mulitple columns.
export class ArraySlicePipe implements PipeTransform { 
    transform(items: Maybe<unknown[]>, rowNr: number, totalRows: number): unknown {
        if(!items?.length) return [];
        let iterations = Math.ceil(items.length / totalRows);
        let rowItems = [];
        for(let i = 0; i < iterations;i++) //Grabs every n'th item,
        {
            let sliced = items.slice(i*totalRows, (i+1)*totalRows);
            if(sliced.length >= rowNr) rowItems.push(sliced[rowNr - 1]);
        }
        return rowItems;
    }
}
