import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { BASE_API_URL } from './injection-tokens.const';
import { FormDataEntry, OptimisticHttpRequest } from './interfaces';

@Injectable({providedIn: "root"})
export class HttpFactoryService {
  
    constructor(
      private httpClient: HttpClient,
      @Inject(BASE_API_URL) private baseUrl: string
    ) {}

    getObserver$(request: Immutable<OptimisticHttpRequest>): Observable<unknown> {
        switch (request.method) {
          case "POST": return this.httpClient.post(this.baseUrl + request.apiUrl, this.constructBody(request.body));
          case "PUT": return this.httpClient.put(this.baseUrl +request.apiUrl, this.constructBody(request.body));
          case "DELETE": return this.httpClient.delete(this.baseUrl + request.apiUrl);
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