import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MissionDocument, Mission } from 'src/app/core/models';
import { Observable, combineLatest } from 'rxjs';
import { MissionDocumentService, MainNavService, NotificationService, MissionService, DocumentTypeService, DownloaderService, DeviceInfoService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Roles, Notifications } from 'src/app/shared-app/enums';
import { takeUntil, filter, map } from 'rxjs/operators';
import { ConfirmDialogComponent, SelectableListBase, ConfirmDialogConfig } from 'src/app/shared/components';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { MailDocumentSheetComponent } from '../mail-document-sheet.component';
import { MissionsFacade } from '../../mission/missions.facade';

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentListComponent extends SubscriptionComponent {
  @ViewChild('documentList') documentList: SelectableListBase<MissionDocument>;
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
    this.missionDocumentService.deleteRange$(ids).subscribe(data =>{
      this.documentList.clearSelections();
      this.notificationService.notify({
        title: `Vellykket! ${ids.length} ${ids.length > 1 ? 'dokumenter' : 'dokument'} slettet.`,
        type: Notifications.Success
      })
    });
  }

  openConfirmDeleteDialog = (ids: number[]) => {   
    let config: ConfirmDialogConfig = {message: 'Slett dokument?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteDocuments(ids));
  }
  
  openMailDocumentSheet = (ids: number[]) => {
    let botRef = this.bottomSheet.open(MailDocumentSheetComponent, {
      data: { toEmailPreset: this.mission.employer ? this.mission.employer.email : null, ids: ids },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe((x) => this.documentList.clearSelections());
  }

  openDocumentForm = () => 
    this.router.navigate(['skjema'], {relativeTo: this.route, queryParams: {missionId: this.missionId}});

  downloadDocument = (document: MissionDocument) => this.downloaderService.downloadUrl(document.fileURL);

  private configureMainNav(missionId: number){
    let cfg = {
      title:  "Dokumenter", 
      backFn: this.onBack, 
      backFnParams: [missionId]
    } as TopDefaultNavConfig;

    this.mainNavService.addConfig({default: cfg});
  }
  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);
}
