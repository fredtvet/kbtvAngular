import { Component } from '@angular/core';
import { IdentityService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'kbtv-client';
  constructor(private identityService: IdentityService){}

  ngOnInit(){
    this.identityService.populate();
  }
}
