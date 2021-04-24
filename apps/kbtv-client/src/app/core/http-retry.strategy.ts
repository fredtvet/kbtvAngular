import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const httpRetryStrategy = ({
    maxRetryAttempts = 4,
    scalingDuration = 1000,
    excludedStatusCodes = []
  }: {maxRetryAttempts?: number, scalingDuration?: number, excludedStatusCodes?: number[]} = {}) => 
  (attempts: Observable<HttpErrorResponse>) => {
    const excludedStatusCodeMap = new Set(excludedStatusCodes);
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;

        if(excludedStatusCodeMap.has(error.status) || retryAttempt > maxRetryAttempts) 
            return throwError(error);
        
        return timer(retryAttempt * scalingDuration);
      }),
    );

  };