import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filetypeFromUrl'
})
export class FiletypeFromUrlPipe implements PipeTransform {

  transform(value: string): string {
    return value.split('.').pop();
  }

}
