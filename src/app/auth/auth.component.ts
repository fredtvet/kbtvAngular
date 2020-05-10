import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService, DataSyncService } from '../core/services';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent {
  authForm: FormGroup;
  hidePassword = true;
  
  constructor(
    private router: Router,
    private identityService: IdentityService,
    private dataSyncService: DataSyncService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  submitForm() {
    this.identityService
    .attemptAuth(this.authForm.value).pipe(tap(x => {
      this.dataSyncService.syncAll();
      this.router.navigateByUrl('/')
    })).subscribe();
  }
}
