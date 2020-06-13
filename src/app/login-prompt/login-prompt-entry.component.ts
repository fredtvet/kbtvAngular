import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginPromptEntryComponent {

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute
    ) {     
    let returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.openDialog(returnUrl);
   }

  openDialog = (returnUrl: string) => {
    this.dialog.open(LoginPromptComponent, {
      data: {returnUrl},
      disableClose: true, 
      panelClass: 'extended-dialog'
    });
  };
}
