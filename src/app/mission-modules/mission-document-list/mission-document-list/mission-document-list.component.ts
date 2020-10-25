import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissionDocument } from 'src/app/core/models';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { DownloaderService } from 'src/app/core/services/downloader.service';
import { FormService } from 'src/app/core/services/form/form.service';
import { ModelFormService } from 'src/app/core/services/model/model-form.service';
import { NotificationService } from 'src/app/core/services/notification';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { Roles } from 'src/app/shared-app/enums';
import { _appFileUrl } from 'src/app/shared-app/helpers/app-file-url.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { SelectableListContainerComponent } from 'src/app/shared/components/abstracts/selectable-list-container.component';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { EmailForm } from 'src/app/shared/forms/email-form.const';
import { FormToSaveModelFileStateCommandAdapter } from 'src/app/shared/model-form/adapters/form-to-save-model-file-state-command.adapter';
import { CreateMissionDocumentForm } from 'src/app/shared/model-forms/create-mission-document-form.const';
import { MissionDocumentListStore } from '../mission-document-list.store';

interface ViewModel { documents: MissionDocument[], isXs: boolean,  fabs: AppButton[], navConfig: MainTopNavConfig}

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
    private confirmService: ConfirmDialogService,
    private modelFormService: ModelFormService) {
      super();
      
      this.navConfig = {title:  "Dokumenter", backFn: this.onBack, }

      this.staticFabs = [
        {icon: "note_add", aria: 'Legg til', color: 'accent', callback: this.openDocumentForm, allowedRoles: [Roles.Leder]}
      ];

      this.selectedItemsFabs = [
        {icon: "send", aria: 'Send', color: 'accent', callback: this.openMailDocumentSheet, allowedRoles: [Roles.Leder]}, 
        {icon: "delete_forever", aria: 'Slett', color: 'warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
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
      title: 'Slett utvalgte dokumenter?', 
      confirmText: 'Slett',
      confirmCallback: this.deleteSelectedDocuments
    })
  }
  
  private openMailDocumentSheet = () => {
    this.formService.open({
      formConfig: {...EmailForm, 
        initialValue: {email: this.store.getMissionEmployer(this.missionId)?.email}}, 
      navConfig: {title: "Send Dokumenter"},
      submitCallback: (val: EmailForm) => { 
        this.store.mailDocuments(val.email, this.currentSelections);
        this.selectableList.clearSelections();
      },
    })
  }

  private openDocumentForm = (): void => {
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)

    this.modelFormService.open({
      formConfig: {
        dynamicForm: {...CreateMissionDocumentForm, initialValue: {missionId: this.missionId}},
        adapter: FormToSaveModelFileStateCommandAdapter,
        stateProp: "missionDocuments",
      }
    });
  }

  private onBack = () => 
   this.router.navigate(['/oppdrag', this.missionId, 'detaljer']);

}
