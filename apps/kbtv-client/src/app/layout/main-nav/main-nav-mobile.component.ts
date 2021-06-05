import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, NgModule, ViewChild } from '@angular/core';
import { DynamicHostDirective } from '@shared-app/dynamic-host.directive';
import { SharedAppModule } from '@shared-app/shared-app.module';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { MainNavService } from '../main-nav.service';

@Component({
  selector: 'app-main-nav-mobile',
  template:`
    <style>
        .outlet-container{
            overflow-x:hidden;
            position:relative;
            height:100%;
            flex-direction: row;
            flex: 1 1 1e-09px;
        }
        @media (min-width: 600px) {
            .outlet-container{ margin-left: 230px!important }
        }
    </style>
    <ng-container *dynamicHost> 

    </ng-container>
    <div class="outlet-container">
        <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavMobileComponent {
    @ViewChild(DynamicHostDirective, {static: true}) dynamicHost: DynamicHostDirective;

    constructor(
        mainNavService: MainNavService,
        private cfr: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef,
    ){
        mainNavService.toggleDrawer$.pipe(first()).subscribe(x => this.loadSideNav())
    }
    
    private loadSideNav(): void {
        from(import('./main-side-nav-mobile.component')).subscribe(({MainSideNavMobileComponent}) => {
            const fac = this.cfr.resolveComponentFactory(MainSideNavMobileComponent);
            this.dynamicHost.viewContainerRef.createComponent(fac);
            this.cdRef.markForCheck();
        })  
    }
}
@NgModule({
    declarations: [MainNavMobileComponent],
    imports: [SharedAppModule],
    exports: []
})
export class MainNavMobileModule { }