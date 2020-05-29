import { Component, OnInit, ViewChild } from '@angular/core';
import { MissionDocument, Mission } from 'src/app/shared/models';
import { Observable, combineLatest } from 'rxjs';
import { MissionDocumentService, MainNavService, NotificationService, MissionService, DocumentTypeService, DownloaderService, DeviceInfoService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Roles } from 'src/app/shared/enums';
import { SelectableListBase } from '../components/selectable-list/selectable-list.base';
import { MailDocumentSheetComponent } from '../components/mail-document-sheet.component';
import { takeUntil, filter, map } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { MissionDocumentFormSheetWrapperComponent } from '../components/mission-document-form/mission-document-form-sheet-wrapper.component';
import { TopDefaultNavConfig } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
})
export class MissionDocumentListComponent extends SubscriptionComponent {
  @ViewChild('documentList', {static: false}) documentList: SelectableListBase<MissionDocument>;
  Roles = Roles;

  currentSelections: number[] = [];
  documentsWithType$: Observable<MissionDocument[]>;
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  private mission: Mission;
  
  constructor(
    private deviceInfoService: DeviceInfoService,     
    private bottomSheet: MatBottomSheet, 
    private downloaderService: DownloaderService,
    private missionDocumentService: MissionDocumentService,
    private documentTypeService: DocumentTypeService,
    private missionService: MissionService,
    private notificationService: NotificationService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    ) { super() }

  get missionId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.configureMainNav(this.missionId)
    let documents$ =  this.missionDocumentService.getByMissionId$(this.missionId);
    let types$ = this.documentTypeService.getAll$();
    this.documentsWithType$ = combineLatest(documents$,types$).pipe(map(([documents, types]) => 
      documents.map(x => {
        x.documentType = types.find(t => t.id == x.documentTypeId);
        return x;
      })
    ));
    this.missionService.getDetails$(this.missionId)
      .pipe(takeUntil(this.unsubscribe)).subscribe(x => this.mission = x)
  }

  deleteDocuments = (ids: number[]) => {
    this.missionDocumentService.deleteRange$(ids).subscribe(data =>
      this.notificationService.setNotification(
        `Vellykket! ${ids.length} ${ids.length > 1 ? 'dokumenter' : 'dokument'} slettet.`
        )
    );
  }

  openConfirmDeleteDialog = (ids: number[]) => {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette utvalgte dokumenter.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteDocuments(ids));
  }
  
  openMailDocumentSheet = (ids: number[]) => {
    let botRef = this.bottomSheet.open(MailDocumentSheetComponent, {
      data: { toEmailPreset: this.mission.employer.email, ids: ids },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe((x) => this.documentList.clearSelections());
  }

  openDocumentForm = () => 
    this.bottomSheet.open(MissionDocumentFormSheetWrapperComponent, {data: {missionId: this.missionId}});

  downloadDocument = (document: MissionDocument) => this.downloaderService.downloadUrl(document.fileURL);

  private configureMainNav(missionId: number){
    let cfg = {
      title:  "Dokumenter", 
      backFn: this.onBack, 
      backFnParams: [missionId]
    } as TopDefaultNavConfig;

    this.mainNavService.addTopNavConfig({default: cfg});
  }
  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);
}
