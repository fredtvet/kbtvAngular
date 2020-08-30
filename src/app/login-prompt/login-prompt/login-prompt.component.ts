import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthStore, Credentials } from 'src/app/core/services/auth';

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
        if(this.data.returnUrl) this.router.navigateByUrl(this.data.returnUrl); 
        else this.router.navigate(["/"])    
        this.dialogRef.close(true);
      })
    ).subscribe();
  }
  
}
