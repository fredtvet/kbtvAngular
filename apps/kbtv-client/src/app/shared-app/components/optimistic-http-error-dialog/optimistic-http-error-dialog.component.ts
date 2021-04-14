import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormattedHttpError, _httpErrorResponseFormatter } from '@shared-app/helpers/http-error-response-formatter.helper';
import { OptimisticHttpErrorAction } from 'optimistic-http';

@Component({
  selector: 'app-optimistic-http-error-dialog',
  templateUrl: './optimistic-http-error-dialog.component.html',
  styleUrls: ['./optimistic-http-error-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimisticHttpErrorDialogComponent {

  httpError: FormattedHttpError;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: OptimisticHttpErrorAction) { 
        this.httpError = _httpErrorResponseFormatter(data.httpError);
    }
  
}