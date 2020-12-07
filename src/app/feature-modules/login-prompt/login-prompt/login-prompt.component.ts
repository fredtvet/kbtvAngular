import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, Credentials } from '@core/services/auth';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPromptComponent {

  @Input() returnUrl: string;

  constructor(    
    private route: ActivatedRoute,
    private authService: AuthService) { }

  authenticate(credentials: Credentials) {
    this.authService.login(
      credentials, 
      this.returnUrl || this.route.snapshot.root.url.toString()
    );
  }
  
}
