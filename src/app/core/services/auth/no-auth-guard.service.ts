import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { DialogService } from '../dialog.service';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {
  constructor(   
    private router: Router,
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let returnUrl = route.queryParams['returnUrl'];  

    if(this.authService.hasTokens()){   
      if(returnUrl) this.router.navigateByUrl(returnUrl);
      else this.router.navigate(['']);
      return false;
    }

    this.dialogService.openLoginPrompt$(returnUrl);

    return true;
  }
}
