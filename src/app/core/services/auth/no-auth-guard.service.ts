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

    if(this.authService.hasTokens()){
      this.router.navigate(['/hjem']);
      return false;
    }

    this.dialogService.openLoginPrompt$();
    
    return true;
  }
}
