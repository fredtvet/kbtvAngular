import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LoginPromptComponent } from 'src/app/shared/components/login-prompt/login-prompt.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openLoginPrompt$(returnUrl: string): Observable<boolean>{
    let ref = this.dialog.open(LoginPromptComponent, {
      data: {returnUrl},
      disableClose: true, 
      panelClass: 'extended-dialog'
    });
    return ref.afterClosed()
  }

}
