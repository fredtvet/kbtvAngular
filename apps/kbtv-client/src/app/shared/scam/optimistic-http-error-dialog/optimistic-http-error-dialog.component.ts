import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionDescriptions } from '@shared-app/constants/action-descriptions.const';
import { FormattedHttpError, _httpErrorResponseFormatter } from '@shared-app/helpers/http-error-response-formatter.helper';
import { SharedAppModule } from '@shared-app/shared-app.module';
import { OptimisticHttpErrorAction } from 'optimistic-http';
import { FailedCommandListComponent } from './failed-command-list/failed-command-list.component';

@Component({
  selector: 'app-optimistic-http-error-dialog',
  templateUrl: './optimistic-http-error-dialog.component.html',
  styleUrls: ['./optimistic-http-error-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimisticHttpErrorDialogComponent {
  ActionDescriptions = ActionDescriptions;

  httpError: FormattedHttpError;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: OptimisticHttpErrorAction) { 
        this.httpError = _httpErrorResponseFormatter(data.httpError);
    }
  
}

@NgModule({
  declarations: [
    OptimisticHttpErrorDialogComponent,
    FailedCommandListComponent
  ],
  imports:[
    SharedAppModule,  
  ]
})
class OptimisticHttpErrorDialogModule {}