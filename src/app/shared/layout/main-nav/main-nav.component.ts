import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { IdentityService } from 'src/app/core';
import { ROLES } from '../../roles.enum';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  @ViewChild('drawer', {static: true}) drawer:MatDrawer;

  @Input() bottomNavEnabled: boolean = true;
  @Input() searchBarEnabled: boolean = false;
  @Output() searchString = new EventEmitter();

  public ROLES = ROLES;
  public title: string;
  public routeSub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private identityService: IdentityService,
     private router: Router,
     private route: ActivatedRoute) {}

  ngOnInit(){
    //Remove '/' and make first letter uppercase for title
    this.title = this.router.url.replace("/","").replace(/^\w/, c => c.toUpperCase())
  }

  toggleDrawer(){
    this.isHandset$.subscribe(handset => {
      if(handset){
        this.drawer.toggle();
      }
    })
  }

  handleLogout(){
    this.identityService.purgeAuth();
    this.router.navigate(['/login']);
  }

}
