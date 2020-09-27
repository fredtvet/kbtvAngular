import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MissionDocument } from 'src/app/core/models';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { DownloaderService } from 'src/app/core/services/downloader.service';
import { FormService } from 'src/app/core/services/form/form.service';
import { NotificationService } from 'src/app/core/services/notification';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { MainNavService } from 'src/app/layout';
import { Roles } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig, MainTopNavComponent, SelectableListComponent } from 'src/app/shared/components';
import { SelectableListContainerComponent } from 'src/app/shared/components/abstracts/selectable-list-container.component';
import { appFileUrl } from 'src/app/shared/helpers/app-file-url.helper';
import { MailDocumentFormComponent } from '../mail-document-form.component';
import { MissionDocumentListStore } from '../mission-document-list.store';

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentListComponent extends SelectableListContainerComponent {
  @ViewChild('documentList') documentList: SelectableListComponent;

  documentsWithType$: Observable<MissionDocument[]> = this.store.getByMissionIdWithType$(this.missionId);
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  get missionId() { return this.route.snapshot.paramMap.get('id') }

  constructor( 
    mainNavService: MainNavService,
    private deviceInfoService: DeviceInfoService,     
    private formService: FormService, 
    private downloaderService: DownloaderService,
    private store: MissionDocumentListStore,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog) {
      super(mainNavService);
      this.staticFabs = [
        {icon: "note_add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openDocumentForm, allowedRoles: [Roles.Leder]}
      ];
      this.selectedItemsFabs = [
        {icon: "send", aria: 'Send', colorClass: 'bg-accent', callback: this.openMailDocumentSheet, allowedRoles: [Roles.Leder]}, 
        {icon: "delete_forever", aria: 'Slett', colorClass: 'bg-warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
      ]
    }
 
  ngOnInit() { this.configureMainNav() }

  downloadDocument = (document: MissionDocument) => 
    this.downloaderService.downloadUrl(appFileUrl(document.fileName, "documents"));

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
