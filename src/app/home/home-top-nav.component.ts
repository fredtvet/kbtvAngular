import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SyncStore } from 'src/app/core/services/sync';
import { LoadingService } from '../core/services/loading.service';
import { BaseTopNavComponent } from '../shared-app/components/base-top-nav.component';

@Component({
  selector: 'app-home',
  template: `
  <mat-toolbar *ngIf="config" class="toolbar-slim mat-elevation-z2 bg-primary">

    <button mat-icon-button aria-label="Toggle sidenav" (click)="toggleDrawer.emit()" fxHide fxShow.xs>
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
    </button>

    <span class="mr-auto">
        <span ngClass.xs="ml-1" ngClass.gt-xs="ml-2">Hjem</span>
    </span>
    
    <mat-spinner *ngIf="loading$ |  async" diameter="24" color="accent" class="mr-2"></mat-spinner>

    <button mat-icon-button (click)="refresh()"><mat-icon>update</mat-icon></button>
    <!-- <app-button [config]="{icon: 'update', callback: this.refresh}"></app-button> -->
  </mat-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTopNavComponent extends BaseTopNavComponent<any>{

    loading$ = this.loadingService.queryLoading$;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        private syncStore: SyncStore,
        private loadingService: LoadingService,
    ) { super(changeDetectorRef) }

    refresh = () => this.syncStore.syncAll();

}
