import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthStore, Credentials } from 'src/app/core/services/auth';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPromptComponent {

  @Input() returnUrl: string;

  constructor(    
    private router: Router,
    private authStore: AuthStore) { }

  authenticate(credentials: Credentials) {
    this.authStore
    .attemptAuth$(credentials).pipe(
      tap(x => {
        if(this.returnUrl) this.router.navigateByUrl(this.returnUrl); 
        else this.router.navigate(["/"])    
      })
    ).subscribe();
  }
  
}
