import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginPromptEntryComponent {

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
    ) { this.openDialog() }

  openDialog = () => {
    let returnUrl = this.route.snapshot.queryParams['returnUrl']
    if(returnUrl === this.router.url.split('?')[0]) returnUrl = undefined;
    this.dialog.open(LoginPromptComponent, {
      data: {returnUrl},
      disableClose: true, 
      panelClass: 'extended-dialog'
    });
  };
}
