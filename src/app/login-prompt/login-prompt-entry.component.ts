import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
  <div class="h-100" fxLayout="row" fxLayoutAlign="center center">
    <app-login-prompt [returnUrl]="returnUrl">
    </app-login-prompt>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPromptEntryComponent {

  get returnUrl(): string{
    let url = this.route.snapshot.queryParams['returnUrl']
    if(url === this.router.url.split('?')[0]) url = undefined;
    return url;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

}
