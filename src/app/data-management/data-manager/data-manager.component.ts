import { Component, ViewChild } from '@angular/core';
import { MissionService, BaseService, MissionTypeService, ReportTypeService, EmployerService, MainNavService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseEntity } from 'src/app/shared/interfaces';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { MissionTypeFormDialogComponent } from '../components/mission-type-form-dialog/mission-type-form-dialog.component';
import { ReportTypeFormDialogComponent } from '../components/report-type-form-dialog/report-type-form-dialog.component';
import { filter, takeUntil, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

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
  private dialog: MatDialog) { 
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

  private getTableService(table: string): BaseService<BaseEntity>{
    switch(table){
      case "Oppdrag": return this.missionService;
      case "Oppdragstyper": return this.missionTypeService;
      case "Oppdragsgivere": return this.employerService;
      case "Rapporttyper": return this.reportTypeService;
    }
  }

  private createMission = () => this.router.navigate(['/oppdrag/ny', {returnRoute: '/data'}])

  private createEmployer = () => this.router.navigate(['/data/oppdragsgivere/ny', {returnRoute: '/data'}])

  private createMissionType(){
    const createDialogRef = this.dialog.open(MissionTypeFormDialogComponent);
    createDialogRef.afterClosed().subscribe(data => {
      if(data == null) return null;
      this.getTableService(this.currentTable).add$(data).subscribe();
    });
  }

  private createReportType(){
    const createDialogRef = this.dialog.open(ReportTypeFormDialogComponent);
    createDialogRef.afterClosed().subscribe(data => {
      if(data == null) return null;
      this.getTableService(this.currentTable).add$(data).subscribe();
    });
  }

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Data";
    this.mainNavService.addConfig(cfg);
  }
}


