import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'thumbnail'})

export class ThumbnailPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/images/gi, "thumbnails");
  }
}