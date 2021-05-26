import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MainNavService } from '../main-nav.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['main-nav.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent extends WithUnsubscribe() {
  @ViewChild('drawer') drawer: MatDrawer;

  config$: Observable<{isXs: boolean}> = this.mainNavService.isXs$.pipe(
    map(x=> { return {isXs: x}}));

  constructor(private mainNavService: MainNavService) {
    super();

    this.mainNavService.toggleDrawer$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(x => this.toggleDrawer());

  }

  ngAfterViewInit(): void {
    this.drawer._container!.backdropClick.pipe( 
      takeUntil(this.unsubscribe),
    ).subscribe(x => this.mainNavService.setDrawerOpenState(false))
  }

  toggleDrawer(){ 
    this.mainNavService.setDrawerOpenState(!this.drawer.opened)
    this.drawer?.toggle(); 
  };
}
