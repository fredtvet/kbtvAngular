import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionDocument } from '@core/models';
import { DeviceInfoService } from '@core/services/device-info.service';
import { DownloaderService } from '@core/services/downloader.service';
import { ConfirmDialogService } from 'src/app/modules/confirm-dialog/confirm-dialog.service';
import { NotificationService } from '@notification/index';
import { AppNotifications } from '@shared-app/const/app-notifications.const';
import { Roles } from '@shared-app/enums';
import { _appFileUrl } from '@shared-app/helpers/app-file-url.helper';
import { AppButton } from '@shared-app/interfaces';
import { SelectableListContainerComponent } from '@shared/components/abstracts/selectable-list-container.component';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { EmailForm } from '@shared/constants/forms/email-form.const';
import { CreateMissionDocumentForm, MissionDocumentForm } from '@shared/constants/model-forms/create-mission-document-form.const';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissionDocumentListFacade } from '../mission-document-list.facade';
import { FormService } from '@form-sheet/form-sheet.service';
import { ModelFormService } from '@model-form/model-form.service';

interface ViewModel { documents: MissionDocument[], isXs: boolean,  fabs: AppButton[], navConfig: MainTopNavConfig}

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentListComponent extends SelectableListContainerComponent {

  vm$: Observable<ViewModel> = combineLatest([
    this.facade.getMissionDocuments$(this.missionId),
    this.deviceInfoService.isXs$,
    this.currentFabs$
  ]).pipe(
    map(([documents, isXs, fabs]) => { return { 
      documents, isXs, fabs, navConfig: this.navConfig
    }})
  )

  private get missionId(): string { return this.route.parent.parent.snapshot.params.id }

  private navConfig: MainTopNavConfig;
  
  constructor( 
    private deviceInfoService: DeviceInfoService,     
    private formService: FormService, 
    private downloaderService: DownloaderService,
    private facade: MissionDocumentListFacade,
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
    this.facade.delete({ids: this.currentSelections});    
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
        initialValue: {email: this.facade.getMissionEmployerEmail(this.missionId) }}, 
      navConfig: {title: "Send Dokumenter"},
      submitCallback: (val: EmailForm) => { 
        this.facade.mailDocuments(val.email, this.currentSelections);
        this.selectableList.clearSelections();
      },
    })
  }

  private openDocumentForm = (): void => {
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)

    this.modelFormService.open<MissionDocumentForm>({
      formConfig: {
        dynamicForm: {...CreateMissionDocumentForm, initialValue: {missionId: this.missionId}},
        stateProp: "missionDocuments",
      }
    });
  }

  private onBack = () => this.router.navigate(['../'], {relativeTo: this.route.parent});

}
