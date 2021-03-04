import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceInfoService } from '@core/services/device-info.service';
import { AuthReturnUrlQueryParam, AuthService, Credentials } from 'state-auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  get returnUrl(): string{
    let url = this.route.snapshot.queryParams[AuthReturnUrlQueryParam]
    if(url === this.router.url.split('?')[0]) url = undefined;
    return url || this.route.snapshot.root.url.toString();
  }

  isSmall$ = this.deviceInfoService.isXs$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private deviceInfoService: DeviceInfoService
  ) {}

  authenticate = (credentials: Credentials) =>
    this.authService.login(credentials, this.returnUrl);

}
