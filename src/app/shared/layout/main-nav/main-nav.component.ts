import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { Router } from "@angular/router";
import { IdentityService, LoadingService, ConnectionService } from 'src/app/core';
import { ROLES } from '../../roles.enum';
import { MatDrawer } from '@angular/material';
import { MainNavConfig } from './main-nav-config.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  @ViewChild('drawer', {static: true}) drawer:MatDrawer;

  @Input() config: MainNavConfig = new MainNavConfig();

  @Output() vertEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() backEvent = new EventEmitter();

  ROLES = ROLES;
  conSub$:  Observable<boolean>;
  user: User;

  searchBarHidden = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private identityService: IdentityService,
    public loadingService: LoadingService,
    private router: Router,
    private connectionService: ConnectionService) {}

  ngOnInit(){
    this.conSub$ = this.connectionService.isOnline$;

    this.identityService.currentUser$
      .subscribe(user => this.user = user);
    //Remove '/' and make first letter uppercase for title
    if(!this.config.title && !this.config.altNav){
      this.config.title = this.router.url.replace("/","").replace(/^\w/, c => c.toUpperCase())
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
