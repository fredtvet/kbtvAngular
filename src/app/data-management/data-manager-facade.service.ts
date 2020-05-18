import { Injectable } from '@angular/core';
import { BaseEntity } from '../shared/interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { BaseService, EmployerService, MissionTypeService, MissionService, ReportTypeService } from '../core/services';
import { AgGridAngular } from 'ag-grid-angular';
import { MissionFormSheetWrapperComponent } from '../mission/components/mission-form/mission-form-sheet-wrapper.component';
import { EmployerFormSheetWrapperComponent } from './components/employer-form/employer-form-sheet-wrapper.component';
import { MissionTypeFormSheetWrapperComponent } from './components/mission-type-form/mission-type-form-sheet-wrapper.component';
import { ReportTypeFormSheetWrapperComponent } from './components/report-type-form/report-type-form-sheet-wrapper.component';
import { MatBottomSheet } from '@angular/material';

@Injectable()

export class DataManagerFacadeService {

  tables = ['Oppdrag', 'Oppdragstyper', 'Oppdragsgivere', 'Rapporttyper']
  
  data$:Observable<BaseEntity[]>;

  selectedTableSubject = new BehaviorSubject<string>(undefined)
  selectedTable$ = this.selectedTableSubject.asObservable();

  constructor(
    
  private _bottomSheet: MatBottomSheet,
    private employerService: EmployerService,
    private missionTypeService: MissionTypeService,
    private missionService: MissionService,
    private reportTypeService: ReportTypeService,
  ) { 
    this.data$ = this.selectedTable$.pipe(
      distinctUntilChanged(),
      filter(table => this.tables.includes(table)),
      switchMap(table => this.getTableService(table).getAllDetails$())
    );
  }

  get selectedTable(){return this.selectedTableSubject.value};

  changeTable = (table:string) => this.selectedTableSubject.next(table);

  updateSelectedTableEntity = (entity: BaseEntity) => 
    this.getTableService(this.selectedTable).update$(entity).subscribe();   

  deleteSelectedTableEntities = (ids: number[]) => 
    this.getTableService(this.selectedTable).deleteRange$(ids).subscribe();

  createItem() {
    switch(this.selectedTable){
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

  private createMission = () => this._bottomSheet.open(MissionFormSheetWrapperComponent);

  private createEmployer = () => this._bottomSheet.open(EmployerFormSheetWrapperComponent);

  private createMissionType = () => this._bottomSheet.open(MissionTypeFormSheetWrapperComponent);

  private createReportType = () => this._bottomSheet.open(ReportTypeFormSheetWrapperComponent);
}
