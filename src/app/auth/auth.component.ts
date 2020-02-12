import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService, MissionListService } from '../core';

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
    private missionListService: MissionListService,
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
    .subscribe(data => {
      this.missionListService.populateInitalList(); //Populate mission list
      this.router.navigateByUrl('/')
    });
  }
}
