import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MissionService } from 'src/app/core/services/data/mission/mission.service';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/core/services';
import { Mission, User } from 'src/app/core/models';
import { SimpleNavConfig, TimesheetFilter, AppButton } from 'src/app/shared-app/interfaces';

import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
//import { takeUntil } from 'rxjs/operators';
//import { TimesheetFilterComponent } from './timesheet-filter/timesheet-filter.component';

@Component({
  selector: 'app-timesheet-filter-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <!-- <ng-template #lazy></ng-template> -->
    <!-- <ng-container *ngIf="filterForm$">
      <ng-template [ngComponentOutlet]="filterForm$ | async"></ng-template>
    </ng-container> -->
    <app-timesheet-filter
      [missions]="missions$ | async" 
      [users]="users$ | async"
      [filterPreset]="data.filter" 
      [disabledFilters]="data.disabledFilters"
      (filterChanged)="updateFilter($event)">
    </app-timesheet-filter>
  </app-simple-top-nav> 
  `
})
export class TimesheetFilterSheetWrapperComponent extends SubscriptionComponent {
  //@ViewChild('lazy', { read: ViewContainerRef }) lazy: ViewContainerRef;

  //filterRef: ComponentRef<TimesheetFilterComponent>;

  missions$: Observable<Mission[]>;
  users$: Observable<User[]>;

  filterForm$: Promise<any>;

  navConfig: SimpleNavConfig;

  constructor(  
    //private resolver: ComponentFactoryResolver,  
    private _missionService: MissionService,
    private _userService: UserService,
    private _bottomSheetRef: MatBottomSheetRef<TimesheetFilterSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {filter: TimesheetFilter, disabledFilters:string[]}) { super() }

  ngOnInit() {
    this.navConfig = {
      title: 'Velg filtre',  
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    };
    //this.loadFilterForm();
    this.initalizeObservables();
  }

  updateFilter = (filter: TimesheetFilter) => this.close(filter)
  
  private close = (filter?: TimesheetFilter) => this._bottomSheetRef.dismiss(filter)

  private initalizeObservables(){
    if(this.data.disabledFilters === undefined || this.data.disabledFilters === null || !this.data.disabledFilters.includes("mission")){
      this.missions$ = this._missionService.getAll$();
    }
    else this.missions$ =  of([]);

    if(this.data.disabledFilters === undefined || this.data.disabledFilters === null || !this.data.disabledFilters.includes("user")){
        this.users$ = this._userService.getAll$();
    } 
    else this.users$ =  of([]);  
  }

  // private loadFilterForm(){
  //   if(!this.filterForm$)
  //     this.filterForm$ = import('src/app/timesheet-modules/timesheet-filter/timesheet-filter.component')
  //       .then(({TimesheetFilterComponent}) => TimesheetFilterComponent);
  // }

  // async loadFilterForm() {
  //   if (!this.filterRef) {
  //     const { TimesheetFilterComponent } = await import('src/app/timesheet-modules/shared-timesheet/components/timesheet-filter/timesheet-filter.component');
  //     const factory = this.resolver.resolveComponentFactory(TimesheetFilterComponent);
  //     this.filterRef = this.lazy.createComponent(factory);

  //     this.filterRef.instance.filterPreset = this.data.filter;
  //     this.filterRef.instance.disabledFilters = this.data.disabledFilters;

  //     this.initalizeFilterObservable();

  //     this.filterRef.instance.filterChanged.pipe(takeUntil(this.unsubscribe)).subscribe(x => this.updateFilter(x));
  //   }
  // }

  // private initalizeFilterObservable(){
  //   this.missions$ = of([]);
  //   if(this.data.disabledFilters === undefined || this.data.disabledFilters === null || !this.data.disabledFilters.includes("mission")){
  //     this.missions$ = this._missionService.getAll$();
  //   }

  //   this.users$ = of([]); 
  //   if(this.data.disabledFilters === undefined || this.data.disabledFilters === null || !this.data.disabledFilters.includes("user")){
  //       this.users$ = this._userService.getAll$();
  //   } 

  //   // combineLatest(missions$, users$).pipe(takeUntil(this.unsubscribe)).subscribe(([missions, users]) => {
  //   //   this.filterRef.instance.missions = missions;
  //   //   this.filterRef.instance.users = users;
  //   // })
  // }



}
