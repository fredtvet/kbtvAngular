import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take, takeUntil } from 'rxjs/operators';
import { Router } from "@angular/router";
import { IdentityService, LoadingService, ConnectionService } from 'src/app/core/services';
import { Roles } from '../../enums/roles.enum';
import { MatDrawer } from '@angular/material';
import { MainNavConfig } from './main-nav-config.model';
import { User } from '../../models/user.model';
import { SubscriptionComponent } from 'src/app/subscription.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent extends SubscriptionComponent {

  @ViewChild('drawer', {static: true}) drawer:MatDrawer;

  @Input() config: MainNavConfig = new MainNavConfig();

  @Output() vertEvent = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() back = new EventEmitter();

  Roles = Roles;

  searchBarHidden = true;

  currentUser$:  Observable<User> = this.identityService.currentUser$.pipe(takeUntil(this.unsubscribe));
  conSub$:  Observable<boolean> = this.connectionService.isOnline$.pipe(takeUntil(this.unsubscribe));
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      takeUntil(this.unsubscribe),
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private identityService: IdentityService,
    public loadingService: LoadingService,
    private router: Router,
    private connectionService: ConnectionService) { super(); }

  ngOnInit(){
    //Get route name and set as title if no input
    if(!this.config.title && !this.config.altNav){
      this.config.title = this.router.url.split(';')[0].split('/')[1].replace(/^\w/, c => c.toUpperCase())
    }
  }

  toggleDrawer(){
    this.isHandset$.pipe(take(1)).subscribe(handset => {
      if(handset) this.drawer.toggle();
    })
  }

  toggleSearchBar(){
    this.searchBarHidden = !this.searchBarHidden;
  }

  handleLogout(){
    this.identityService.purgeAuth();
    this.router.navigate(['/login']);
  }

  ngDoCheck(){
    if(this.config.title)
      this.config.title = this.config.title.replace(/;/g, "<br />");
  }
}
