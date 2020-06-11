import { Injectable } from '@angular/core';
import { BaseEntity } from '../shared/interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { BaseService, EmployerService, MissionTypeService, MissionService, DocumentTypeService } from '../core/services';
import { EmployerFormSheetWrapperComponent } from './components/employer-form/employer-form-sheet-wrapper.component';
import { MissionTypeFormSheetWrapperComponent } from './components/mission-type-form/mission-type-form-sheet-wrapper.component';
import { DocumentTypeFormSheetWrapperComponent } from './components/document-type-form/document-type-form-sheet-wrapper.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()

export class DataManagerFacadeService {

  tables = ['Oppdrag', 'Oppdragstyper', 'Oppdragsgivere', 'Dokumenttyper']
  
  data$:Observable<BaseEntity[]>;

  selectedTableSubject = new BehaviorSubject<string>(undefined)
  selectedTable$ = this.selectedTableSubject.asObservable();

  constructor(
    
  private _bottomSheet: MatBottomSheet,
    private employerService: EmployerService,
    private missionTypeService: MissionTypeService,
    private missionService: MissionService,
    private DocumentTypeService: DocumentTypeService,
    private router: Router,
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
      case "Dokumenttyper": this.createDocumentType(); break;
    }
  }

  private getTableService(table: string): BaseService<BaseEntity>{
    switch(table){
      case "Oppdrag": return this.missionService;
      case "Oppdragstyper": return this.missionTypeService;
      case "Oppdragsgivere": return this.employerService;
      case "Dokumenttyper": return this.DocumentTypeService;
    }
  }

  private createMission = () => this.router.navigate(['data/ny/oppdrag']);

  private createEmployer = () => this._bottomSheet.open(EmployerFormSheetWrapperComponent);

  private createMissionType = () => this._bottomSheet.open(MissionTypeFormSheetWrapperComponent);

  private createDocumentType = () => this._bottomSheet.open(DocumentTypeFormSheetWrapperComponent);
}
