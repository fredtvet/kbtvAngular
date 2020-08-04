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
import { TopDefaultNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { MailDocumentSheetComponent } from '../mail-document-sheet.component';

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentListComponent extends SubscriptionComponent {
  @ViewChild('documentList') documentList: SelectableListBase<MissionDocument>;

  documentsWithType$: Observable<MissionDocument[]>;
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  private currentSelections: number[] = [];
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

  get selectedItemsFabs(): AppButton[] {
    return [
      {icon: "send", aria: 'Send', callback: this.openMailDocumentSheet, allowedRoles: [Roles.Leder]}, 
      {icon: "delete_forever", aria: 'Slett', colorClass: 'bg-warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
    ]
  }

  get staticFabs(): AppButton[] {
    return [{icon: "note_add", aria: 'Legg til', callback: this.openDocumentForm, allowedRoles: [Roles.Leder]}]
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

  onSelectionChange(selections: number[]){
    if(!selections) return undefined;
    this.currentSelections = selections;
    this.updateFabs();
  }

  downloadDocument = (document: MissionDocument) => this.downloaderService.downloadUrl(document.fileURL);

  private updateFabs(){
    let fabs = this.mainNavService.getCurrentFabs();
    let totalFabCount = this.staticFabs.length + this.selectedItemsFabs.length;

    if(this.currentSelections.length === 0 && fabs.length === totalFabCount) //If no selections remove fabs if existing
      this.mainNavService.removeFabsByIcons(this.selectedItemsFabs.map(x => x.icon))
    else if (this.currentSelections.length > 0 && fabs.length === this.staticFabs.length)
      this.mainNavService.addFabs(this.selectedItemsFabs);
  }

  private deleteSelectedDocuments = () => {
    this.missionDocumentService.deleteRange$(this.currentSelections).subscribe(data =>{
      this.documentList.clearSelections();
      this.notificationService.notify({
        title: `Vellykket! ${this.currentSelections.length} ${this.currentSelections.length > 1 ? 'dokumenter' : 'dokument'} slettet.`,
        type: Notifications.Success
      })
    });
  }

  private openConfirmDeleteDialog = () => {   
    let config: ConfirmDialogConfig = {message: 'Slett dokument?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteSelectedDocuments());
  }
  
  private openMailDocumentSheet = () => {
    let botRef = this.bottomSheet.open(MailDocumentSheetComponent, {
      data: { toEmailPreset: this.mission.employer ? this.mission.employer.email : null, ids: this.currentSelections },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe((x) => this.documentList.clearSelections());
  }

  private openDocumentForm = () => 
    this.router.navigate(['skjema'], {relativeTo: this.route, queryParams: {missionId: this.missionId}});

  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);

  private configureMainNav(missionId: number){
    let topCfg = {
      title:  "Dokumenter", 
      backFn: this.onBack, 
      backFnParams: [missionId]
    } as TopDefaultNavConfig;

    this.mainNavService.addConfig({default: topCfg}, this.staticFabs);
  }
}
