import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { MissionImage, ModelFile } from '@core/models';
import { DeviceInfoService } from '@core/services/device-info.service';
import { DownloaderService } from '@core/services/downloader.service';
import { BottomSheetMenuService } from '@core/services/ui/bottom-sheet-menu.service';
import { ConfirmDialogService } from 'src/app/modules/confirm-dialog/confirm-dialog.service';
import { NotificationService } from '@notification/index';
import { AppNotifications } from '@shared-app/const/app-notifications.const';
import { RolePresets, Roles } from '@shared-app/enums';
import { _appFileUrl } from '@shared-app/helpers/app-file-url.helper';
import { AppButton } from '@shared-app/interfaces';
import { SelectableListContainerComponent } from '@shared/components/abstracts/selectable-list-container.component';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { EmailForm } from '@shared/constants/forms/email-form.const';
import { ImageViewerDialogWrapperComponent } from '../image-viewer/image-viewer-dialog-wrapper.component';
import { MissionImageListFacade } from '../mission-image-list.facade';
import { FormService } from '@form-sheet/form-sheet.service';

interface ViewModel { images: MissionImage[], isXs: boolean,  fabs: AppButton[], navConfig: MainTopNavConfig }

@Component({
  selector: "app-mission-image-list",
  templateUrl: "./mission-image-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionImageListComponent extends SelectableListContainerComponent{
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;

  get missionId() { return this.route.parent.parent.snapshot.params.id }
  
  vm$: Observable<ViewModel> = combineLatest([
    this.facade.getByMissionId$(this.missionId),
    this.deviceInfoService.isXs$,
    this.currentFabs$
  ]).pipe(
    tap(x => this.images = x[0]),
    map(([images, isXs, fabs]) => { return { 
      images, isXs, fabs, navConfig: this.navConfig
    }})
  )

  private navConfig: MainTopNavConfig;

  private images: MissionImage[];

  constructor( 
    private downloaderService: DownloaderService,
    private deviceInfoService: DeviceInfoService,
    private menuService: BottomSheetMenuService,
    private formService: FormService,
    private confirmService: ConfirmDialogService,
    private dialog: MatDialog,
    private facade: MissionImageListFacade,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router) {
      super();
      this.navConfig = {
        title:  "Bilder",
        backFn: this.onBack,
        buttons: [{icon: "more_vert", callback: this.openBottomSheetMenu}],
      }

      this.staticFabs = [
        {icon: "camera_enhance", aria: 'Ta bilde', color: 'accent', callback: this.openImageInput, allowedRoles: RolePresets.Internal}
      ];

      this.selectedItemsFabs = [
        {icon: "send", aria: 'Send', color: 'accent', callback: this.openMailImageSheet, allowedRoles: [Roles.Leder]}, 
        {icon: "delete_forever", aria: 'Slett', color: 'warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
      ]
    }

  openImageViewer(image: ModelFile, images: ModelFile[]) {
    this.dialog.open(ImageViewerDialogWrapperComponent, {
      width: "100%",
      height: "100%",
      panelClass: "image_viewer_dialog",
      data: {currentImage: image, images},
    });
  }

  uploadImages = (files: FileList): void => 
    this.facade.add({missionId: this.missionId, files});
  
  private openImageInput = (): void =>{ 
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)
    
    this.imageInput.nativeElement.click()
  };

  private deleteSelectedImages = () => {
    this.currentSelections;
    this.facade.delete({ids: this.currentSelections});     
    this.selectableList.clearSelections();
  }

  private  openConfirmDeleteDialog = () => {   
    this.confirmService.open({
      title: "Slett utvalgte bilder?",
      confirmText: 'Slett',
      confirmCallback: this.deleteSelectedImages
    })
  }
  
  private openMailImageSheet = () => {
    this.formService.open({
      formConfig: {...EmailForm, initialValue: {email: this.facade.mission?.employer?.email }}, 
      navConfig: {title: "Send bilder"},
      submitCallback: (val: EmailForm) => { 
        this.facade.mailImages(val.email, this.currentSelections);
        this.selectableList.clearSelections();
      },
    })
  }

  private openBottomSheetMenu = () => {   
    this.menuService.open([
      {icon:'send', text:'Send alle bilder', callback: this.openMailImageSheet, allowedRoles: RolePresets.Authority},
      {icon: "cloud_download", text: "Last ned alle", callback: this.downloadImages, params: [this.images]},
    ]);
  }

  private downloadImages = (imgs: MissionImage[]) => 
    this.downloaderService.downloadUrls(imgs.map(x => _appFileUrl(x.fileName, "images")));

  private onBack = () => this.router.navigate(['../'], {relativeTo: this.route.parent});
  
 
}
