import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take, takeUntil } from 'rxjs/operators';
import { Router } from "@angular/router";
import { IdentityService, LoadingService, ConnectionService, UserTimesheetService } from 'src/app/core/services';
import { Roles } from '../../enums/roles.enum';
import { MatDrawer } from '@angular/material';
import { MainNavConfig } from './main-nav-config.model';
import { User } from '../../models/user.model';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { TimesheetStatus } from '../../enums/timesheet-status.enum';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent extends SubscriptionComponent {

  @ViewChild('drawer', {static: true}) drawer:MatDrawer;

  @Input() config: MainNavConfig = new MainNavConfig();

  @Output() bottomSheetOpened =  new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() back = new EventEmitter();
  @Output() iconActionClicked = new EventEmitter();

  Roles = Roles;

  searchBarHidden = true;

  openTimesheetCount$: Observable<number> = this.userTimesheetService.getCount$(TimesheetStatus.Open);
  currentUser$:  Observable<User> = this.identityService.currentUser$.pipe(takeUntil(this.unsubscribe));
  conSub$:  Observable<boolean> = this.connectionService.isOnline$.pipe(takeUntil(this.unsubscribe));

  isXs$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      takeUntil(this.unsubscribe),
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private identityService: IdentityService,
    private userTimesheetService: UserTimesheetService,
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
    this.isXs$.pipe(take(1)).subscribe(xs => {if(xs) this.drawer.toggle()})
  }

  toggleSearchBar(){
    this.searchBarHidden = !this.searchBarHidden;
  }

  handleLogout(){
    this.identityService.purgeAuth();
    this.router.navigate(['/login']);
  }

  ngDoCheck(){
    console.log('d')
    if(this.config.title)
      this.config.title = this.config.title.replace(/;/g, "<br />");
  }
}
