import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const httpRetryStrategy = ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
    excludedStatusCodes = []
  }: {maxRetryAttempts?: number, scalingDuration?: number, excludedStatusCodes?: number[]} = {}) => 
  (attempts: Observable<HttpErrorResponse>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;

        const notIncluded = excludedStatusCodes.find(e => e === error.status);
        if(retryAttempt > maxRetryAttempts || notIncluded) 
            return throwError(error);
        
        return timer(retryAttempt * scalingDuration);
      }),
    );

  };