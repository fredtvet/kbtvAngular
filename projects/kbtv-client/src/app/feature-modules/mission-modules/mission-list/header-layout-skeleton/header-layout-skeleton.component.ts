import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { MainTopNavConfig } from "@shared/components/main-top-nav-bar/main-top-nav.config";

@Component({
    selector: 'app-header-layout-skeleton',
    templateUrl: './header-layout-skeleton.component.html',
    styleUrls: ['./header-layout-skeleton.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class HeaderLayoutSkeletonComponent {
    @ViewChild('contentHeader', {read: ElementRef}) contentHeader: ElementRef<HTMLElement>;

    @Input() navConfig: MainTopNavConfig;
    @Input() navOverlayDisabled: MainTopNavConfig;

    contentScrolledToTop?: boolean = false;
    noHeaderNode: boolean;

    //Adjustments for mat-toolbar breakpoint
    private isLargeScreen: boolean = 
        window.screen.width > 599 ? true : false;
  
    constructor(private cdRef: ChangeDetectorRef) {  }
  
    ngAfterViewInit(): void {
        const rootMargin = this.isLargeScreen ?  "-66px 0px 0px 0px" :  "-58px 0px 0px 0px"
        const el: HTMLElement = this.contentHeader.nativeElement;
        const observer = new IntersectionObserver((items) => {
            this.contentScrolledToTop = !items[0].isIntersecting;
            this.cdRef.detectChanges();
        }, {
            root: el.parentElement, threshold: 0.99, rootMargin
        });
    
        observer.observe(el);
    }
}