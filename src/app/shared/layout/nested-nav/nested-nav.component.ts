import { Component,Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NavAction } from '../../components/nav-action.model';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { IdentityService } from 'src/app/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nested-nav',
  templateUrl: './nested-nav.component.html',
  styleUrls: ['./nested-nav.component.css']
})
export class NestedNavComponent {

  @Input() title:string;
  @Input() icon:string;
  @Input() subTitle:string;
  @Input() subIcon: string;
  @Input() botNavEnabled:boolean = true;

  @Input() actions: NavAction[];

  @Output() event = new EventEmitter();

  public user: User;
  private userSub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  public allActionRoles: string[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private identityService: IdentityService,
    private router: Router,) { }

  ngOnInit(){
    this.userSub = this.identityService.currentUser.subscribe(id => this.user = id.user);
    console.log(this.user);
  }

  ngOnChanges(){
    this.title = this.title.replace(/;/g, "<br />");
  }

  handleLogout(){
    this.identityService.purgeAuth();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
