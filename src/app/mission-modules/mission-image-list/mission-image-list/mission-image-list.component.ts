import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from "rxjs/operators";
import { MissionImage, ModelFile } from 'src/app/core/models';
import { FormService } from 'src/app/core/services/form/form.service';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { MainNavService } from 'src/app/layout';
import { appFileUrl } from 'src/app/shared/helpers/app-file-url.helper';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig, MainTopNavComponent, SelectableListBase } from 'src/app/shared/components';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav/main-top-nav-config.interface';
import { ImageViewerDialogWrapperComponent } from '../image-viewer/image-viewer-dialog-wrapper.component';
import { MailImageFormComponent } from '../mail-image-form.component';
import { MissionImageListStore } from '../mission-image-list.store';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { DownloaderService } from 'src/app/core/services/downloader.service';
import { NotificationService } from 'src/app/core/services/notification';

@Component({
  selector: "app-mission-image-list",
  templateUrl: "./mission-image-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionImageListComponent {
  @ViewChild('imageList') imageList: SelectableListBase<ModelFile>;
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;

  currentSelections: string[] = [];

  images$: Observable<MissionImage[]>;
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  get missionId() {
    return this.route.snapshot.paramMap.get('id');
  }

  get selectedItemsFabs(): AppButton[] {
    return [
      {icon: "send", aria: 'Send', colorClass: 'bg-accent', callback: this.openMailImageSheet, allowedRoles: [Roles.Leder]}, 
      {icon: "delete_forever", aria: 'Slett', colorClass: 'bg-warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
    ]
  }

  get staticFabs(): AppButton[] {
    return [{icon: "camera_enhance", aria: 'Ta bilde', colorClass: 'bg-accent', callback: this.openImageInput, allowedRoles: RolePresets.Internal}]
  }

  constructor(
    private downloaderService: DownloaderService,
    private deviceInfoService: DeviceInfoService,
    private formService: FormService,
    private dialog: MatDialog,
    private mainNavService: MainNavService,
    private store: MissionImageListStore,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router) {}

  ngOnInit() { 
    this.configureMainNav();
    this.images$ = this.store.getByMissionId$(this.missionId).pipe(
      tap(this.updateMainNav)
    );
  }

  onSelectionChange(selections: string[]){
    if(!selections) return undefined;
    this.currentSelections = selections;
    this.updateFabs();
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
  
  private updateFabs(){
    let fabs = this.mainNavService.currentFabs;
    let totalFabCount = this.staticFabs.length + this.selectedItemsFabs.length;

    if(this.currentSelections.length === 0 && fabs.length === totalFabCount) //If no selections remove fabs if existing
      this.mainNavService.removeFabsByCallback(this.selectedItemsFabs.map(x => x.callback))
    else if (this.currentSelections.length > 0 && fabs.length === this.staticFabs.length)
      this.mainNavService.updateConfig({fabs: this.selectedItemsFabs});
  }

  private deleteSelectedImages = () => {
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

  private downloadImages = (imgs: MissionImage[]) => 
    this.downloaderService.downloadUrls(imgs.map(x => appFileUrl(x.fileName, "images")));

  private onBack = () => this.router.navigate(['/oppdrag', this.missionId, 'detaljer']);

  private configureMainNav(){
    this.mainNavService.addConfig({
      fabs: this.staticFabs,
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {
        title:  "Bilder",
        backFn: this.onBack
      }
    });
  }

  private updateMainNav = (images: MissionImage[]) => {
    let topNavConfig = this.mainNavService.getTopNavConfig<MainTopNavConfig>(); 

    topNavConfig.bottomSheetButtons = [
      {icon:'send', text:'Send alle bilder', callback: this.openMailImageSheet, 
      params: [images.map(x => x.id)], allowedRoles: RolePresets.Authority},
      {icon: "cloud_download", text: "Last ned alle", callback: this.downloadImages, 
      params: [images]},
    ]
    
    this.mainNavService.updateConfig({topNavConfig});
  }  


}
