import { Component, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { filter, takeUntil, tap } from "rxjs/operators";
import { RolePresets, Notifications } from 'src/app/shared-app/enums';
import { Observable } from 'rxjs';
import { MissionImage, Mission } from 'src/app/core/models';
import { MissionImageService, MainNavService, NotificationService, MissionService, DeviceInfoService, DownloaderService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppButton, AppFile, TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { ConfirmDialogComponent, SelectableListBase, ConfirmDialogConfig } from 'src/app/shared/components';
import { MailImageSheetComponent } from '../components/mail-image-sheet.component';
import { ImageViewerDialogWrapperComponent } from '../components/image-viewer/image-viewer-dialog-wrapper.component';

@Component({
  selector: "app-mission-image-list",
  templateUrl: "./mission-image-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionImageListComponent extends SubscriptionComponent{
  @ViewChild('imageList') imageList: SelectableListBase<AppFile>;

  RolePresets = RolePresets;

  private mission: Mission;

  currentSelections: number[] = [];

  images$: Observable<MissionImage[]>;
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;
  
  constructor(
    private downloaderService: DownloaderService,
    private deviceInfoService: DeviceInfoService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private mainNavService: MainNavService,
    private missionImageService: MissionImageService,
    private missionService: MissionService,
    private route: ActivatedRoute,
    private router: Router) {
      super();
      this.configureMainNav(this.missionId);
    }

  get missionId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.images$ = this.missionImageService.getByMissionId$(this.missionId).pipe(tap(this.updateMainNav));

    this.missionService.getDetails$(this.missionId)
      .pipe(takeUntil(this.unsubscribe)).subscribe(x => this.mission = x)
  }

  uploadImages = (files: FileList) => {
    this.missionImageService.addImages$(this.missionId, files).subscribe(data =>
      this.notificationService.notify({
        title: `Vellykket! ${data.length} ${data.length > 1 ? 'bilder' : 'bilde'} lastet opp.`,
        type: Notifications.Success
      })
    );
  }

  deleteImages = (ids: number[]) => {
    this.missionImageService.deleteRange$(ids).subscribe(data =>{
      this.imageList.clearSelections();
      this.notificationService.notify({
        title: `Vellykket! ${ids.length} ${ids.length > 1 ? 'bilder' : 'bilde'} slettet.`,        
        type: Notifications.Success
      })     
    })    
  }

  openConfirmDeleteDialog = (ids: number[]) => {   
    let config: ConfirmDialogConfig = {message: 'Slett utvalgte bilder?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteImages(ids));
  }
  
  openMailImageSheet = (ids: number[]) => {
    let botRef = this.bottomSheet.open(MailImageSheetComponent, {
      data: { toEmailPreset: this.mission.employer ? this.mission.employer.email : null, ids: ids },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe((x) => this.imageList.clearSelections());
  }

  openImageViewer(image: AppFile, images: AppFile[]) {
    this.dialog.open(ImageViewerDialogWrapperComponent, {
      width: "100%",
      height: "100%",
      panelClass: "image_viewer_dialog",
      data: {currentImage: image, images},
    });
  }

  private configureMainNav(missionId: number){
    let cfg = {
      title:  "Bilder",
      backFn: this.onBack,
      backFnParams: [missionId]
    } as TopDefaultNavConfig;

    this.mainNavService.addTopNavConfig({default: cfg});
  }


  private updateMainNav = (images: MissionImage[]) => {
    let cfg = this.mainNavService.getTopDefaultNavConfig(); 
    cfg.bottomSheetButtons = [
      {icon:'send', text:'Send alle bilder', callback: this.openMailImageSheet, 
      params: [images.map(x => x.id)], allowedRoles: RolePresets.Authority},
      {icon: "cloud_download", text: "Last ned alle", callback: this.downloadImages, 
      params: [images.map(x => x.fileURL)]},
    ]
    this.mainNavService.addTopNavConfig({default: cfg});
  }  

  private downloadImages = (fileUrls: string[]) => 
    this.downloaderService.downloadUrls(fileUrls)

  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);

}
