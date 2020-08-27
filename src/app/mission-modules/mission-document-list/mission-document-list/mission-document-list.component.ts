import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MissionDocument } from 'src/app/core/models';
import { DeviceInfoService, DownloaderService, MainNavService, NotificationService } from 'src/app/core/services';
import { Notifications, Roles } from 'src/app/shared-app/enums';
import { AppButton, TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig, SelectableListBase } from 'src/app/shared/components';
import { MailDocumentSheetComponent } from '../mail-document-sheet.component';
import { MissionDocumentListStore } from '../mission-document-list.store';

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentListComponent {
  @ViewChild('documentList') documentList: SelectableListBase<MissionDocument>;

  documentsWithType$: Observable<MissionDocument[]> = this.store.getByMissionIdWithType$(this.missionId);
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  private currentSelections: number[] = [];
  
  get missionId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  get selectedItemsFabs(): AppButton[] {
    return [
      {icon: "send", aria: 'Send', colorClass: 'bg-accent', callback: this.openMailDocumentSheet, allowedRoles: [Roles.Leder]}, 
      {icon: "delete_forever", aria: 'Slett', colorClass: 'bg-warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
    ]
  }

  get staticFabs(): AppButton[] {
    return [{icon: "note_add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openDocumentForm, allowedRoles: [Roles.Leder]}]
  }

  constructor(
    private deviceInfoService: DeviceInfoService,     
    private bottomSheet: MatBottomSheet, 
    private downloaderService: DownloaderService,
    private store: MissionDocumentListStore,
    private notificationService: NotificationService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) {}
 
  ngOnInit() {
    this.configureMainNav(this.missionId)
  }

  onSelectionChange(selections: number[]){
    if(!selections) return undefined;
    this.currentSelections = selections;
    this.updateFabs();
  }

  downloadDocument = (document: MissionDocument) => 
    this.downloaderService.downloadUrl(document.fileURL);

  private updateFabs(){
    let fabs = this.mainNavService.currentFabs;
    let totalFabCount = this.staticFabs.length + this.selectedItemsFabs.length;

    if(this.currentSelections.length === 0 && fabs.length === totalFabCount) //If no selections remove fabs if existing
      this.mainNavService.removeFabsByIcons(this.selectedItemsFabs.map(x => x.icon))
    else if (this.currentSelections.length > 0 && fabs.length === this.staticFabs.length)
      this.mainNavService.addFabs(this.selectedItemsFabs);
  }

  private deleteSelectedDocuments = () => {
    this.store.deleteRange$(this.currentSelections).subscribe(x =>{
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
      data: { toEmailPreset: this.store.getMissionEmployer(this.missionId)?.email, ids: this.currentSelections },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe((x) => this.documentList.clearSelections());
  }

  private openDocumentForm = () => 
    this.router.navigate(['skjema', {config: JSON.stringify({missionId: this.missionId})}], {relativeTo: this.route});

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
