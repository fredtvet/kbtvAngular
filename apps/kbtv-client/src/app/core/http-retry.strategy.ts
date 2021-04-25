import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const httpRetryStrategy = ({
    maxRetryAttempts = 4,
    scalingDuration = 1000,
    excludedStatusCodes = []
  }: {maxRetryAttempts?: number, scalingDuration?: number, excludedStatusCodes?: number[]} = {}) => 
  (attempts: Observable<HttpErrorResponse>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;

        if((excludedStatusCodes.indexOf(error.status) !== -1) || retryAttempt > maxRetryAttempts) 
            return throwError(error);
        
        return timer(retryAttempt * scalingDuration);
      }),
    );

  };