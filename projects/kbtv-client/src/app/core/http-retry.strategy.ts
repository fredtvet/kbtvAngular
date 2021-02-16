import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { _convertArrayToObject } from 'array-helpers';

export const httpRetryStrategy = ({
    maxRetryAttempts = 4,
    scalingDuration = 1000,
    excludedStatusCodes = []
  }: {maxRetryAttempts?: number, scalingDuration?: number, excludedStatusCodes?: number[]} = {}) => 
  (attempts: Observable<HttpErrorResponse>) => {
    const excludedStatusCodeMap = _convertArrayToObject(excludedStatusCodes);
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;

        if(excludedStatusCodeMap[error.status] || retryAttempt > maxRetryAttempts) 
            return throwError(error);
        
        return timer(retryAttempt * scalingDuration);
      }),
    );

  };