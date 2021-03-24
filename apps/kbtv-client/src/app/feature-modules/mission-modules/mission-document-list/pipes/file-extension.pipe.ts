import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from 'global-types';

@Pipe({
  name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {

  transform(value: Maybe<string>): string {
    return value?.split('.').pop() || "";
  }

}
