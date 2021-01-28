import { FileFolder } from "@shared/enums/file-folder.enum";
import { environment } from 'src/environments/environment';

export function _appFileUrl(fileName: string, folder: FileFolder, disableCache?: boolean): string{ 
    let url = `${environment.fileServerUrl}/${folder}/${fileName}`;
    if(disableCache) url = url + `/?x=${Math.floor(Math.random() * 100)}`
    return url;
};
