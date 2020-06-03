import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../interfaces/credentials.interface';
import { tap } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DataSyncService } from 'src/app/core/services/data/data-sync.service';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.scss']
})
export class LoginPromptComponent implements OnInit {

  constructor(    
    private router: Router,
    private authService: AuthService,
    private dataSyncService: DataSyncService, 
    private dialogRef: MatDialogRef<LoginPromptComponent>) { }

  ngOnInit() {
  }

  authenticate(credentials: Credentials) {
    this.authService
    .attemptAuth$(credentials).pipe(
      tap(x => {
        this.dataSyncService.syncAll();
        this.router.navigateByUrl('/');      
        this.dialogRef.close(true);
      })
    ).subscribe();
  }
  
}
