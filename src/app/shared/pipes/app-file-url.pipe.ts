import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModelFile } from '@core/models';
import { _appFileUrl } from '@shared-app/helpers/app-file-url.helper';
import { FileFolders } from '../constants/file-folders.const';

@Pipe({
  name: 'appFileUrl'
})
export class AppFileUrlPipe implements PipeTransform {

  constructor(private readonly domSanitizer: DomSanitizer){}

  transform(modelFile: ModelFile, folder: typeof FileFolders[number], disableCache?: boolean): string {
    if(!modelFile) return;
    if(modelFile.temp_localFileUrl) 
      return <string> this.domSanitizer.bypassSecurityTrustResourceUrl(modelFile.temp_localFileUrl); 
    if(modelFile.fileName)
      return _appFileUrl(modelFile.fileName, folder, disableCache);
  }

}
