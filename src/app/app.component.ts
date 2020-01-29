import { Component } from '@angular/core';
import { IdentityService, LoadingService, NotificationService } from './core';
import { take, delay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'kbtv-client';

  constructor(
    private identityService: IdentityService,
    public loadingService: LoadingService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar){

    }

  ngOnInit(){
    this.identityService.populate(); //Mulig grunn til bug? Home er del av app module

  }



}
