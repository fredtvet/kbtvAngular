import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MissionDocument } from 'src/app/core/models';
import { FormService } from 'src/app/core/services/form/form.service';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { MainNavService } from 'src/app/layout';
import { appFileUrl } from 'src/app/shared/helpers/app-file-url.helper';
import { Roles } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig, MainTopNavComponent, SelectableListBase } from 'src/app/shared/components';
import { MailDocumentFormComponent } from '../mail-document-form.component';
import { MissionDocumentListStore } from '../mission-document-list.store';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { DownloaderService } from 'src/app/core/services/downloader.service';
import { NotificationService } from 'src/app/core/services/notification';

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentListComponent {
  @ViewChild('documentList') documentList: SelectableListBase<MissionDocument>;

  documentsWithType$: Observable<MissionDocument[]> = this.store.getByMissionIdWithType$(this.missionId);
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  private currentSelections: string[] = [];
  
  get missionId() {
    return this.route.snapshot.paramMap.get('id');
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
    private formService: FormService, 
    private downloaderService: DownloaderService,
    private store: MissionDocumentListStore,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog) {}
 
  ngOnInit() { this.configureMainNav() }

  onSelectionChange(selections: string[]){
    if(!selections) return undefined;
    this.currentSelections = selections;
    this.updateFabs();
  }

  downloadDocument = (document: MissionDocument) => 
    this.downloaderService.downloadUrl(appFileUrl(document.fileName, "documents"));

  private updateFabs(){
    let fabs = this.mainNavService.currentFabs;
    let totalFabCount = this.staticFabs.length + this.selectedItemsFabs.length;

    if(this.currentSelections.length === 0 && fabs.length === totalFabCount) //If no selections remove fabs if existing
      this.mainNavService.removeFabsByCallback(this.selectedItemsFabs.map(x => x.callback))
    else if (this.currentSelections.length > 0 && fabs.length === this.staticFabs.length)
      this.mainNavService.updateConfig({fabs: this.selectedItemsFabs});
  }

  private deleteSelectedDocuments = () => {
    this.store.delete({ids: this.currentSelections});    
    this.documentList.clearSelections();
  }

  private openConfirmDeleteDialog = () => {   
    let config: ConfirmDialogConfig = {message: 'Slett dokument?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteSelectedDocuments());
  }
  
  private openMailDocumentSheet = () => {
    let botRef = this.formService.open({
      formComponent: MailDocumentFormComponent,
      formConfig: { toEmailPreset: this.store.getMissionEmployer(this.missionId)?.email, ids: this.currentSelections },
    });

    botRef
      .afterDismissed()
      .pipe(filter(result => result?.action != null))
      .subscribe((x) => this.documentList.clearSelections());
  }

  private openDocumentForm = (): void => {
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)
  
    this.router.navigate([
      'skjema', 
      {config: JSON.stringify({formConfig:{viewConfig:{lockedValues: {missionId: this.missionId}}}})}
    ], {relativeTo: this.route});
  }

  private onBack = () => this.router.navigate(['/oppdrag', this.missionId, 'detaljer']);

  private configureMainNav(){
    this.mainNavService.addConfig({
      fabs: this.staticFabs,
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {
        title:  "Dokumenter", 
        backFn: this.onBack
      }
    });
  }
}
