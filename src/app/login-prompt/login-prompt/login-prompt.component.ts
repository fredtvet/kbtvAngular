import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthStore } from 'src/app/core/services';
import { Credentials } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPromptComponent {

  constructor(    
    private router: Router,
    private authStore: AuthStore,
    private dialogRef: MatDialogRef<LoginPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {returnUrl: string}) { }

  authenticate(credentials: Credentials) {
    this.authStore
    .attemptAuth$(credentials).pipe(
      tap(x => {
        this.router.navigateByUrl(this.data.returnUrl);      
        this.dialogRef.close(true);
      })
    ).subscribe();
  }
  
}
