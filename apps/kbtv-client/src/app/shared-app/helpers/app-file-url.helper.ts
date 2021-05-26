import { FileFolder } from "@shared/enums/file-folder.enum";
import { environment } from 'src/environments/environment';
import { _isBlobUrl } from "./is-blob-url.helper";

export function _appFileUrl(fileName: string, folder: FileFolder, disableCache?: boolean): string{ 
    if(_isBlobUrl(fileName)) return fileName; //Check for local file urls
    let url = `${environment.fileServerUrl}/${folder}/${fileName}`;
    if(disableCache) url = url + `/?x=${Math.floor(Math.random() * 100)}`
    return url;
};
