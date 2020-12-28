import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModelFile } from '@core/models';
import { Maybe } from 'global-types';
import { _appFileUrl } from '@shared-app/helpers/app-file-url.helper';
import { FileFolders } from '../constants/file-folders.const';

@Pipe({name: 'appFileUrl'})
export class AppFileUrlPipe implements PipeTransform {

  constructor(private readonly domSanitizer: DomSanitizer){}

  transform(modelFile: Maybe<ModelFile>, folder: typeof FileFolders[number], disableCache?: boolean): Maybe<string> {
    if(!modelFile) return null;
    if(modelFile.localFileUrl) 
      return <string> this.domSanitizer.bypassSecurityTrustResourceUrl(modelFile.localFileUrl); 
    if(modelFile.fileName)
      return _appFileUrl(modelFile.fileName, folder, disableCache);
    return null;
  }

}
