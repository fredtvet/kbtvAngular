import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { MissionImage, ModelFile } from 'src/app/core/models';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { DownloaderService } from 'src/app/core/services/downloader.service';
import { FormService } from 'src/app/core/services/form/form.service';
import { NotificationService } from 'src/app/core/services/notification';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { BottomSheetMenuService } from 'src/app/core/services/ui/bottom-sheet-menu.service';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { _appFileUrl } from 'src/app/shared-app/helpers/app-file-url.helper';
import { SelectableListContainerComponent } from 'src/app/shared/components/abstracts/selectable-list-container.component';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
import { ViewModel } from 'src/app/shared/interfaces/view-model.interface';
import { ImageViewerDialogWrapperComponent } from '../image-viewer/image-viewer-dialog-wrapper.component';
import { MailImageFormComponent } from '../mail-image-form.component';
import { MissionImageListStore } from '../mission-image-list.store';

@Component({
  selector: "app-mission-image-list",
  templateUrl: "./mission-image-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionImageListComponent extends SelectableListContainerComponent{
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;

  get missionId() { return this.route.snapshot.paramMap.get('id'); }
  
  vm$: Observable<ViewModel<{images: MissionImage[], isXs: boolean}>> = combineLatest([
    this.store.getByMissionId$(this.missionId),
    this.deviceInfoService.isXs$,
    this.currentFabs$
  ]).pipe(
    tap(x => this.images = x[0]),
    map(([images, isXs, fabs]) => { return { 
      content: {images, isXs}, 
      fabs: fabs
    }})
  )

  navConfig: MainTopNavConfig;

  private images: MissionImage[];

  constructor( 
    private downloaderService: DownloaderService,
    private deviceInfoService: DeviceInfoService,
    private menuService: BottomSheetMenuService,
    private formService: FormService,
    private confirmService: ConfirmDialogService,
    private dialog: MatDialog,
    private store: MissionImageListStore,
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
        {icon: "camera_enhance", aria: 'Ta bilde', colorClass: 'bg-accent', callback: this.openImageInput, allowedRoles: RolePresets.Internal}
      ];

      this.selectedItemsFabs = [
        {icon: "send", aria: 'Send', colorClass: 'bg-accent', callback: this.openMailImageSheet, allowedRoles: [Roles.Leder]}, 
        {icon: "delete_forever", aria: 'Slett', colorClass: 'bg-warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
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
    this.store.add({missionId: this.missionId, files});
  
  private openImageInput = (): void =>{ 
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)
    
    this.imageInput.nativeElement.click()
  };

  private deleteSelectedImages = () => {
    this.currentSelections;
    this.store.delete({ids: this.currentSelections});     
    this.selectableList.clearSelections();
  }

  private  openConfirmDeleteDialog = () => {   
    this.confirmService.open({
      message: 'Slett utvalgte bilder?', confirmText: 'Slett',
      confirmCallback: this.deleteSelectedImages
    })
  }
  
  private openMailImageSheet = () => {
    this.formService.open({
      customTitle: "Send bilder",
      formComponent: MailImageFormComponent,
      formConfig: { toEmailPreset: this.store.mission?.employer?.email, ids: this.currentSelections },
    }).afterDismissed().subscribe(x => x?.action ? this.selectableList.clearSelections() : null);
  }

  private openBottomSheetMenu = () => {   
    this.menuService.open([
      {icon:'send', text:'Send alle bilder', callback: this.openMailImageSheet, allowedRoles: RolePresets.Authority},
      {icon: "cloud_download", text: "Last ned alle", callback: this.downloadImages, params: [this.images]},
    ]);
  }

  private downloadImages = (imgs: MissionImage[]) => 
    this.downloaderService.downloadUrls(imgs.map(x => _appFileUrl(x.fileName, "images")));

  private onBack = () => this.router.navigate(['/oppdrag', this.missionId, 'detaljer']);  
 
}
