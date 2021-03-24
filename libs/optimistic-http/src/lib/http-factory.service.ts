import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { CommandIdHeader } from './command-id-header.const';
import { BASE_API_URL } from './injection-tokens.const';
import { FormDataEntry, OptimisticHttpRequest } from './interfaces';

@Injectable({providedIn: "root"})
export class HttpFactoryService {
  
    constructor(
      private httpClient: HttpClient,
      @Inject(BASE_API_URL) private baseUrl: string
    ) {}

    getObserver$(request: Immutable<OptimisticHttpRequest>, commandId: string): Observable<unknown> {
      const options: {headers: HttpHeaders} = { headers: new HttpHeaders({[CommandIdHeader]: commandId}) }
        switch (request.method) {
          case "POST": return this.httpClient.post(this.baseUrl + request.apiUrl, this.constructBody(request.body), options);
          case "PUT": return this.httpClient.put(this.baseUrl +request.apiUrl, this.constructBody(request.body), options);
          case "DELETE": return this.httpClient.delete(this.baseUrl + request.apiUrl, options);
        }
    }

    private constructBody(body: Maybe<{}> | FormDataEntry[]) : Maybe<{}> | FormData {
      if(!Array.isArray(body)) return body; //Assume all arrays are FormDataEntry
      const formData = new FormData(); //Hydrate form data object

      for(const entry of body) 
        if(entry.value instanceof File)
          formData.append(entry.name, entry.value, entry.value.name);
        else 
          formData.append(entry.name, entry.value);
      
      return formData;   
    }
}