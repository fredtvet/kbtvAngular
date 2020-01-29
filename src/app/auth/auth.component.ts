import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  authForm: FormGroup;

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  submitForm() {
    this.identityService
    .attemptAuth(this.authForm.value)
    .subscribe(data => this.router.navigateByUrl('/'));
  }
}
