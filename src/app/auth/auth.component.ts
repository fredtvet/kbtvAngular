import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, DataSyncService } from '../core/services';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthComponent {
  authForm: FormGroup;
  hidePassword = true;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private dataSyncService: DataSyncService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    this.authService
    .attemptAuth$(this.authForm.value).pipe(tap(x => {
      this.dataSyncService.syncAll();
      this.router.navigateByUrl('/')
    })).subscribe();
  }
}
