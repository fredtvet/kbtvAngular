import { Pipe, PipeTransform } from '@angular/core';
import { FileFolders } from '../file-folders.const';
import { appFileUrl } from '../app-file-url.helper';

@Pipe({
  name: 'appFileUrl'
})
export class AppFileUrlPipe implements PipeTransform {

  transform(fileName: string, folder: typeof FileFolders[number], disableCache?: boolean): any {
    return appFileUrl(fileName, folder, disableCache);
  }

}
