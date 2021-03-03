import {
  HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    private totalRequests = 0;

    constructor(private loadingService: LoadingService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler) {   
      if(request.responseType != "json") return next.handle(request);
      this.totalRequests++;
      this.loadingService.setHttpLoading(true);
      return next.handle(request).pipe(finalize(() => this.decreaseRequests()));
    }  

    private decreaseRequests() {
      this.totalRequests--;
      if (this.totalRequests === 0) {
        this.loadingService.setHttpLoading(false);
      }
    }
}
