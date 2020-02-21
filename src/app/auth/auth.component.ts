import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService, DataSyncService } from '../core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent {
  authForm: FormGroup;

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
    .attemptAuth(this.authForm.value).pipe(switchMap(x => {
      this.router.navigateByUrl('/')
      return this.dataSyncService.syncAll();
    })).subscribe();
  }
}
