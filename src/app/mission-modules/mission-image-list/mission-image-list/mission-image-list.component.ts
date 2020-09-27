import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from "rxjs/operators";
import { MissionImage, ModelFile } from 'src/app/core/models';
import { FormService } from 'src/app/core/services/form/form.service';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { MainNavService } from 'src/app/layout';
import { appFileUrl } from 'src/app/shared/helpers/app-file-url.helper';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { BottomSheetMenuComponent, ConfirmDialogComponent, ConfirmDialogConfig, MainTopNavComponent, SelectableListComponent } from 'src/app/shared/components';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav/main-top-nav-config.interface';
import { ImageViewerDialogWrapperComponent } from '../image-viewer/image-viewer-dialog-wrapper.component';
import { MailImageFormComponent } from '../mail-image-form.component';
import { MissionImageListStore } from '../mission-image-list.store';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { DownloaderService } from 'src/app/core/services/downloader.service';
import { NotificationService } from 'src/app/core/services/notification';
import { SelectableListContainerComponent } from 'src/app/shared/components/abstracts/selectable-list-container.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: "app-mission-image-list",
  templateUrl: "./mission-image-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionImageListComponent extends SelectableListContainerComponent{
  @ViewChild('imageList') imageList: SelectableListComponent;
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;

  images$: Observable<MissionImage[]> = this.store.getByMissionId$(this.missionId).pipe(
    tap(x => this.images = x)
  );

  private images: MissionImage[];

  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  get missionId() { return this.route.snapshot.paramMap.get('id'); }
  
  constructor( 
    mainNavService: MainNavService,
    private downloaderService: DownloaderService,
    private deviceInfoService: DeviceInfoService,
    private matBottomSheet: MatBottomSheet,
    private formService: FormService,
    private dialog: MatDialog,
    private store: MissionImageListStore,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router) {
      super(mainNavService);
      this.staticFabs = [
        {icon: "camera_enhance", aria: 'Ta bilde', colorClass: 'bg-accent', callback: this.openImageInput, allowedRoles: RolePresets.Internal}
      ];
      this.selectedItemsFabs = [
        {icon: "send", aria: 'Send', colorClass: 'bg-accent', callback: this.openMailImageSheet, allowedRoles: [Roles.Leder]}, 
        {icon: "delete_forever", aria: 'Slett', colorClass: 'bg-warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
      ]
    }

  ngOnInit() { this.configureMainNav(); }

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
    this.imageList.clearSelections();
  }

  private  openConfirmDeleteDialog = () => {   
    let config: ConfirmDialogConfig = {message: 'Slett utvalgte bilder?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteSelectedImages());
  }
  
  private openMailImageSheet = () => {
    let botRef = this.formService.open({
      customTitle: "Send bilder",
      formComponent: MailImageFormComponent,
      formConfig: { toEmailPreset: this.store.mission?.employer?.email, ids: this.currentSelections },
    });

    botRef
      .afterDismissed()
      .pipe(filter(result => result?.action != null))
      .subscribe((x) => this.imageList.clearSelections());
  }

  private openBottomSheetMenu = () => {   
    this.matBottomSheet.open(BottomSheetMenuComponent, { data: [
      {icon:'send', text:'Send alle bilder', callback: this.openMailImageSheet, allowedRoles: RolePresets.Authority},
      {icon: "cloud_download", text: "Last ned alle", callback: this.downloadImages, params: [this.images]},
    ]});
  }

  private downloadImages = (imgs: MissionImage[]) => 
    this.downloaderService.downloadUrls(imgs.map(x => appFileUrl(x.fileName, "images")));

  private onBack = () => this.router.navigate(['/oppdrag', this.missionId, 'detaljer']);

  private configureMainNav(){
    this.mainNavService.addConfig({
      fabs: this.staticFabs,
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {
        title:  "Bilder",
        backFn: this.onBack,
        buttons: [{icon: "more_vert", callback: this.openBottomSheetMenu}],
      }
    });
  }

}
