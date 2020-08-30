import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from "rxjs/operators";
import { MissionImage } from 'src/app/core/models';
import { DeviceInfoService, DownloaderService } from 'src/app/core/services';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { ConfirmDialogComponent, ConfirmDialogConfig, SelectableListBase } from 'src/app/shared/components';
import { ImageViewerDialogWrapperComponent } from '../image-viewer/image-viewer-dialog-wrapper.component';
import { MailImageSheetComponent } from '../mail-image-sheet.component';
import { MissionImageListStore } from '../mission-image-list.store';
import { NotificationType, NotificationService } from 'src/app/core/services/notification';
import { AppFile,AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: "app-mission-image-list",
  templateUrl: "./mission-image-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionImageListComponent {
  @ViewChild('imageList') imageList: SelectableListBase<AppFile>;
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;

  currentSelections: number[] = [];

  images$: Observable<MissionImage[]>;
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  get missionId() {
    return +this.route.snapshot.paramMap.get('id');
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
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private mainNavService: MainNavService,
    private store: MissionImageListStore,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() { 
    this.configureMainNav(this.missionId);
    this.images$ = this.store.getByMissionId$(this.missionId).pipe(tap(this.updateMainNav));
  }

  onSelectionChange(selections: number[]){
    if(!selections) return undefined;
    this.currentSelections = selections;
    this.updateFabs();
  }

  openImageViewer(image: AppFile, images: AppFile[]) {
    this.dialog.open(ImageViewerDialogWrapperComponent, {
      width: "100%",
      height: "100%",
      panelClass: "image_viewer_dialog",
      data: {currentImage: image, images},
    });
  }

  uploadImages = (files: FileList) => {
    this.store.add$({missionId: this.missionId, files}).subscribe(x =>
      this.notificationService.notify({
        title: `Vellykket! ${files.length} ${files.length > 1 ? 'bilder' : 'bilde'} lastet opp.`,
        type: NotificationType.Success
      })
    );
  }

  private openImageInput = (): void => this.imageInput.nativeElement.click();
  
  private updateFabs(){
    let fabs = this.mainNavService.currentFabs;
    let totalFabCount = this.staticFabs.length + this.selectedItemsFabs.length;

    if(this.currentSelections.length === 0 && fabs.length === totalFabCount) //If no selections remove fabs if existing
      this.mainNavService.removeFabsByIcons(this.selectedItemsFabs.map(x => x.icon))
    else if (this.currentSelections.length > 0 && fabs.length === this.staticFabs.length)
      this.mainNavService.addFabs(this.selectedItemsFabs);
  }

  private deleteSelectedImages = () => {
    this.store.deleteRange$(this.currentSelections).subscribe(data =>{
      this.imageList.clearSelections();
      this.notificationService.notify({
        title: `Vellykket! ${this.currentSelections.length} ${this.currentSelections.length > 1 ? 'bilder' : 'bilde'} slettet.`,        
        type: NotificationType.Success
      })     
    })    
  }

  private  openConfirmDeleteDialog = () => {   
    let config: ConfirmDialogConfig = {message: 'Slett utvalgte bilder?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteSelectedImages());
  }
  
  private openMailImageSheet = () => {
    let botRef = this.bottomSheet.open(MailImageSheetComponent, {
      data: { toEmailPreset: this.store.getMissionEmployer(this.missionId)?.email, ids: this.currentSelections },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe((x) => this.imageList.clearSelections());
  }

  private downloadImages = (fileUrls: string[]) => 
    this.downloaderService.downloadUrls(fileUrls)

  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);

  private configureMainNav(missionId: number){
    let cfg = {
      title:  "Bilder",
      backFn: this.onBack,
      backFnParams: [missionId]
    } as TopDefaultNavConfig;

    this.mainNavService.addConfig({default: cfg}, this.staticFabs);
  }

  private updateMainNav = (images: MissionImage[]) => {
    let cfg = this.mainNavService.topDefaultNavConfig; 
    cfg.bottomSheetButtons = [
      {icon:'send', text:'Send alle bilder', callback: this.openMailImageSheet, 
      params: [images.map(x => x.id)], allowedRoles: RolePresets.Authority},
      {icon: "cloud_download", text: "Last ned alle", callback: this.downloadImages, 
      params: [images.map(x => x.fileURL)]},
    ]
    this.mainNavService.addConfig({default: cfg}, this.staticFabs);
  }  


}
