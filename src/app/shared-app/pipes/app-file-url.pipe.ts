import { Pipe, PipeTransform } from '@angular/core';
import { FileFolders } from '../file-folders.const';
import { appFileUrl } from '../app-file-url.helper';
import { ModelFile } from 'src/app/core/models';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'appFileUrl'
})
export class AppFileUrlPipe implements PipeTransform {

  constructor(private readonly domSanitizer: DomSanitizer){}

  transform(modelFile: ModelFile, folder: typeof FileFolders[number], disableCache?: boolean): any {
    if(modelFile.temp_localFileUrl) 
      return this.domSanitizer.bypassSecurityTrustResourceUrl(modelFile.temp_localFileUrl); 
    if(modelFile.fileName)
      return appFileUrl(modelFile.fileName, folder, disableCache);
  }

}
