import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../api.service';
import { TranslationService } from '../utility/translation.service';
import { map, tap } from 'rxjs/operators';
import { DownloaderService } from '../downloader.service';

@Injectable({
  providedIn: 'root'
})
export class JsonToCsvExportService {
  private uri = "/ExportJsonToCsv"

  constructor(
      private apiService: ApiService,
      private translationService: TranslationService,
      private downloaderService: DownloaderService,
    ) {}

  exportJsonToCsv$ = (jsonObjects: Object[], propMap?: { [key: string]: string }): Observable<string> => {
    if(!jsonObjects || jsonObjects === null || jsonObjects.length === 0) return throwError("No object provided");
    let propertyMap = propMap ? propMap : this.getTranslatedPropMap(jsonObjects[0]);

    return this.apiService.post(this.uri, {jsonObjects, propertyMap}).pipe(
        tap(x => this.downloaderService.downloadUrl(x)));
  }


  private getTranslatedPropMap(object: Object): { [key: string]: string }{
    return Object.getOwnPropertyNames(object).reduce((map, prop) => { 
        map[prop] = this.translationService.translateProperty(prop);
        return map;
    }, {})
  }


}

