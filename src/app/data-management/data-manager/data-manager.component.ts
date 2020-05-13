import { Component, ViewChild } from '@angular/core';
import { MissionService, BaseService, MissionTypeService, ReportTypeService, EmployerService, MainNavService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseEntity } from 'src/app/shared/interfaces';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { filter, takeUntil, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { EmployerFormSheetWrapperComponent } from '../components/employer-form/employer-form-sheet-wrapper.component';
import { MissionFormSheetWrapperComponent } from 'src/app/mission/components/mission-form/mission-form-sheet-wrapper.component';
import { MissionTypeFormSheetWrapperComponent } from '../components/mission-type-form/mission-type-form-sheet-wrapper.component';
import { ReportTypeFormSheetWrapperComponent } from '../components/report-type-form/report-type-form-sheet-wrapper.component';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html'
})

export class DataManagerComponent extends SubscriptionComponent {
@ViewChild('dataGrid', {static: false}) dataGrid: AgGridAngular;

data$:Observable<BaseEntity[]>;

tables = ['Oppdrag', 'Oppdragstyper', 'Oppdragsgivere', 'Rapporttyper']

constructor(
  private mainNavService: MainNavService,
  private employerService: EmployerService,
  private missionTypeService: MissionTypeService,
  private missionService: MissionService,
  private reportTypeService: ReportTypeService,
  private router: Router,
  private route: ActivatedRoute,
  private dialog: MatDialog,
  private _bottomSheet: MatBottomSheet) { 
    super(); 
    this.configureMainNav();
  }

  get currentTable(){
    return this.route.snapshot.queryParams['currentTable'];
  }

  ngOnInit(){
    this.data$ = this.route.queryParams.pipe(
      distinctUntilChanged(),
      map(qp => qp['currentTable']),
      filter(table => this.tables.includes(table)),
      switchMap(table => this.getTableService(table).getAllDetails$()),
      takeUntil(this.unsubscribe)
    );
  }

  changeTable(table: string){
    this.router.navigate(['data'], {queryParams: {currentTable: table}})
  }

  editCell(e: any){
    if(e.oldValue != e.newValue)
      this.getTableService(this.currentTable).update$(e.data).subscribe(x => {}, error => {
        e.node.setDataValue(e.column.colId, e.oldValue) //Reset value on error
      });        
  }

  deleteItems(ids: number[]): boolean{
    if(ids.length == 0) return false;
    this.getTableService(this.currentTable).deleteRange$(ids).subscribe();
  }

  createItem() {
    switch(this.currentTable){
      case "Oppdrag": this.createMission(); break;
      case "Oppdragstyper": this.createMissionType(); break;
      case "Oppdragsgivere": this.createEmployer(); break;
      case "Rapporttyper": this.createReportType(); break;
    }
  }

  private createMission = () => this._bottomSheet.open(MissionFormSheetWrapperComponent);

  private createEmployer = () => this._bottomSheet.open(EmployerFormSheetWrapperComponent);

  private createMissionType = () => this._bottomSheet.open(MissionTypeFormSheetWrapperComponent);

  private createReportType = () => this._bottomSheet.open(ReportTypeFormSheetWrapperComponent);

  private getTableService(table: string): BaseService<BaseEntity>{
    switch(table){
      case "Oppdrag": return this.missionService;
      case "Oppdragstyper": return this.missionTypeService;
      case "Oppdragsgivere": return this.employerService;
      case "Rapporttyper": return this.reportTypeService;
    }
  }

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Data";
    this.mainNavService.addConfig(cfg);
  }
}


