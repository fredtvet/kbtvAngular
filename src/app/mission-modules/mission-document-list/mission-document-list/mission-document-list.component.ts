import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { MissionDocument } from 'src/app/core/models';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { DownloaderService } from 'src/app/core/services/downloader.service';
import { FormService } from 'src/app/core/services/form/form.service';
import { NotificationService } from 'src/app/core/services/notification';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { Roles } from 'src/app/shared-app/enums';
import { SelectableListContainerComponent } from 'src/app/shared/components/abstracts/selectable-list-container.component';
import { _appFileUrl } from 'src/app/shared-app/helpers/app-file-url.helper';
import { MailDocumentFormComponent } from '../mail-document-form.component';
import { MissionDocumentListStore } from '../mission-document-list.store';
import { map } from 'rxjs/operators';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
import { BaseViewModel } from 'src/app/shared/interfaces/base-view-model.interface';

interface ViewModel extends BaseViewModel { documents: MissionDocument[], isXs: boolean }

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentListComponent extends SelectableListContainerComponent {

  vm$: Observable<ViewModel> = combineLatest([
    this.store.getByMissionIdWithType$(this.missionId),
    this.deviceInfoService.isXs$,
    this.currentFabs$
  ]).pipe(
    map(([documents, isXs, fabs]) => { return { 
      documents, isXs, fabs, navConfig: this.navConfig
    }})
  )


  get missionId() { return this.route.snapshot.paramMap.get('id') }

  private navConfig: MainTopNavConfig;
  
  constructor( 
    private deviceInfoService: DeviceInfoService,     
    private formService: FormService, 
    private downloaderService: DownloaderService,
    private store: MissionDocumentListStore,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private confirmService: ConfirmDialogService,) {
      super();
      
      this.navConfig = {title:  "Dokumenter", backFn: this.onBack, }

      this.staticFabs = [
        {icon: "note_add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openDocumentForm, allowedRoles: [Roles.Leder]}
      ];

      this.selectedItemsFabs = [
        {icon: "send", aria: 'Send', colorClass: 'bg-accent', callback: this.openMailDocumentSheet, allowedRoles: [Roles.Leder]}, 
        {icon: "delete_forever", aria: 'Slett', colorClass: 'bg-warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
      ]
    }

  downloadDocument = (document: MissionDocument) => 
    this.downloaderService.downloadUrl(_appFileUrl(document.fileName, "documents"));

  private deleteSelectedDocuments = () => {
    this.store.delete({ids: this.currentSelections});    
    this.selectableList.clearSelections();
  }

  private openConfirmDeleteDialog = () => {   
    this.confirmService.open({
      message: 'Slett utvalgte dokumenter?', confirmText: 'Slett',
      confirmCallback: this.deleteSelectedDocuments
    })
  }
  
  private openMailDocumentSheet = () => {
    this.formService.open({
      formComponent: MailDocumentFormComponent,
      formConfig: { toEmailPreset: this.store.getMissionEmployer(this.missionId)?.email, ids: this.currentSelections },
    }).afterDismissed().subscribe(x => x?.action ? this.selectableList.clearSelections() : null);
  }

  private openDocumentForm = (): void => {
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)
  
    this.router.navigate([
      'skjema', 
      {config: JSON.stringify({formConfig:{viewConfig:{lockedValues: {missionId: this.missionId}}}})}
    ], {relativeTo: this.route});
  }

  private onBack = () => 
   this.router.navigate(['/oppdrag', this.missionId, 'detaljer']);

}
