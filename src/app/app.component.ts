import { Component } from '@angular/core';
import { IdentityService, LoadingService } from './core';
import { take, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'kbtv-client';

  constructor(
    private identityService: IdentityService,
    public loadingService: LoadingService){}

  ngOnInit(){
    this.identityService.populate();
  }
}
