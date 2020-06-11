import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../interfaces/credentials.interface';
import { tap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DataSyncService } from 'src/app/core/services/data/data-sync.service';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPromptComponent implements OnInit {

  constructor(    
    private router: Router,
    private authService: AuthService,
    private dataSyncService: DataSyncService, 
    private dialogRef: MatDialogRef<LoginPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {returnUrl: string}) { }

  ngOnInit() {
  }

  authenticate(credentials: Credentials) {
    this.authService
    .attemptAuth$(credentials).pipe(
      tap(x => {
        this.dataSyncService.syncAll();
        this.router.navigateByUrl(this.data.returnUrl);      
        this.dialogRef.close(true);
      })
    ).subscribe();
  }
  
}
